import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import SummaryPicker from "../TeachingSummaryPage/SummaryPicker";
import { useQuery } from "@tanstack/react-query";
import { getAllProgrammes } from "../../api/requests/programme.api";
import { getAllTerms } from "../../api/requests/term.api";
import { uniqueSet } from "../../utils/uniqueSet";
import SkeletonDemo from "./SkeletonLoading";
import type { MajorState } from "../../models/major";

type MajorSelectCardProps = {
  data: {
    selectName: string;
    selectOptions: string[];
  }[];
  isSummary?: boolean;
  noMajor?: boolean;
  major: MajorState;
  setMajor: Dispatch<SetStateAction<MajorState>>;
};

const MajorSelectCard = (props: MajorSelectCardProps) => {
  const { isSummary, noMajor, major, setMajor } = props;
  const { data: programmeData } = useQuery({
    queryKey: ["programmes"],
    queryFn: () => getAllProgrammes(),
  });

  const {
    data: termData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "terms",
      major.programme.id,
      major.major.id,
      major.year.academicYear,
      major.semester.code,
    ],
    queryFn: () =>
      getAllTerms(
        major.programme.id,
        major.major.id,
        major.year.academicYear,
        major.semester.code
      ),
    enabled: !!major.programme.id,
  });

  const [uniqueYear, setUniqueYear] = useState<string[]>([]);
  const [uniqueSemester, setUniqueSemester] = useState<
    { code: string; name: string }[]
  >([]);
  const lastProgrammeRef = useRef<number | null>(null);
  const lastYearRef = useRef<string | null>(null);

  useEffect(() => {
    const currentProgrammeId = major.programme.id;
    if (currentProgrammeId === lastProgrammeRef.current) return;

    if (!termData || termData.length === 0) {
      // clear years and reset selected year when no data for this programme
      setUniqueYear([]);
      lastYearRef.current = null;
      setMajor((prev) => ({
        ...prev,
        year: { index: 0, academicYear: "" },
        term: { index: 0, id: 0 },
        semester: { index: 0, code: "" },
        major: { index: 0, id: 0 },
      }));
      return;
    }

    const years = Array.from(
      uniqueSet(termData.map((item) => item.academicYear || ""))
    );

    setUniqueYear(years);

    const firstYear = years[0] || "";

    setMajor((prev) => ({
      ...prev,
      year: { index: 0, academicYear: firstYear },
      term: { index: 0, id: 0 },
      semester: { index: 0, code: "" },
      major: { index: 0, id: 0 },
    }));

    lastProgrammeRef.current = currentProgrammeId;
    lastYearRef.current = null;
  }, [termData, major.programme.id, setMajor]);

  useEffect(() => {
    const currentYear = major.year.academicYear;

    if (isFetching) return;

    if (!termData || termData.length === 0 || !currentYear) {
      setUniqueSemester([]);
      console.log("clear semesters");
      if (!currentYear) {
        setMajor((prev) => ({
          ...prev,
          semester: { index: 0, code: "" },
          term: { index: 0, id: 0 },
          major: { index: 0, id: 0 },
        }));
      }
      // lastYearRef.current = currentYear;
      return;
    }

    if (lastYearRef.current === currentYear) return;

    const semestersRaw = termData
      .filter((t) => t.academicYear === currentYear)
      .map((t) => ({ code: t.code || "", name: t.name || t.code || "" }));

    const uniqueCodes = Array.from(uniqueSet(semestersRaw.map((s) => s.code)));
    const uniqueSemesters = uniqueCodes.map((code) => {
      const found = semestersRaw.find((s) => s.code === code);
      return { code, name: found?.name || code };
    });

    setUniqueSemester(uniqueSemesters);

    const firstSemester = uniqueSemesters[0]?.code || "";

    // Only set semester (don't overwrite year). Reset term/major indices.
    setMajor((prev) => ({
      ...prev,
      semester: { index: 0, code: firstSemester },
      term: { index: 0, id: 0 },
      major: { index: 0, id: 0 },
    }));

    lastYearRef.current = currentYear;
  }, [isFetching, major.year.academicYear, setMajor, termData]);

  const handleSetMajor = async (
    title: "programme" | "year" | "semester" | "major",
    subtitle: "id" | "academicYear" | "code",
    index: number,
    id: string | number
  ) => {
    // if the old values equal new value, return
    if (major[title].index === index) return;

    if (title === "programme") {
      const programmeId = Number(id);
      setMajor((prev) => ({
        ...prev,
        programme: { index, id: programmeId },
        year: { index: 0, academicYear: "" },
        term: { index: 0, id: 0 },
        semester: { index: 0, code: "" },
        major: { index: 0, id: 0 },
      }));
      return;
    }

    if (title === "year") {
      const value = id as string;
      setMajor((prev) => ({
        ...prev,
        year: { index, academicYear: value },
        // clear semester/term/major when changing year
        semester: { index: 0, code: "" },
        term: { index: 0, id: 0 },
        major: { index: 0, id: 0 },
      }));
      return;
    }

    setMajor((prev) => {
      const value = subtitle === "id" ? Number(id) : id;
      return {
        ...prev,
        [title]: {
          index: index,
          [subtitle]: value,
        },
      } as typeof prev;
    });
  };

  const renderMajor = () => {
    return programmeData?.map((item, index) => {
      return (
        <button
          onClick={() => handleSetMajor("programme", "id", index, item.id)}
          key={index}
          className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${
            major.programme.index === index
              ? "border-1 bg-gray/0 border-bright text-secondary"
              : ""
          }`}
        >
          {item.name}
        </button>
      );
    });
  };

  const renderTerms = () => {
    return (
      <>
        <div className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">Year:</span>
          </div>
          <div className="flex items-center gap-2 w-fit">
            {uniqueYear.map((item, index) => {
              return (
                <button
                  onClick={() =>
                    handleSetMajor("year", "academicYear", index, item)
                  }
                  key={index}
                  className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${
                    major.year.index === index
                      ? "border-1 bg-gray/0 border-bright text-secondary"
                      : ""
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">Semester:</span>
          </div>
          <div className="flex items-center gap-2 w-fit">
            {uniqueSemester.map((item, index) => {
              return (
                <button
                  onClick={() =>
                    handleSetMajor("semester", "code", index, item.code)
                  }
                  key={index}
                  className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${
                    major.semester.index === index
                      ? "border-1 bg-gray/0 border-bright text-secondary"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {isSummary || !noMajor ? (
          <div className="flex items-center gap-8 py-2">
            <div className="text-right text-primary w-[80px]">
              <span className="text-sm font-medium w-fit">Major:</span>
            </div>
            <div className="flex items-center gap-2 w-fit">
              {termData?.map((item, index) => {
                return (
                  <button
                    onClick={() =>
                      handleSetMajor("major", "id", index, item.id)
                    }
                    key={index}
                    className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${
                      major.major.index === index
                        ? "border-1 bg-gray/0 border-bright text-secondary"
                        : ""
                    }`}
                  >
                    {item.departments[index]?.name || ""}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 py-2">
            <div className="text-right text-primary w-[80px]">
              <span className="text-sm font-medium w-fit">From:</span>
            </div>
            <div className="flex items-center gap-2 w-fit font-semibold">
              <SummaryPicker /> to <SummaryPicker />
            </div>
          </div>
        )}
      </>
    );
  };

  console.log(uniqueSemester);
  return (
    <div
      className={`${
        !isSummary ? "basis-7/12" : "w-fit"
      } px-3 py-2 border-1 h-[222px] border-gray-400 whitespace-nowrap rounded-lg`}
    >
      {isLoading ? (
        <SkeletonDemo skeletonNum={9} />
      ) : (
        <>
          <div className="pt-3 py-2">
            <div className="flex items-center gap-8 py-2">
              <div className="text-right text-primary w-[80px]">
                <span className="text-sm font-medium w-fit">Programme:</span>
              </div>
              <div className="flex items-center gap-2 w-fit">
                {renderMajor()}
              </div>
            </div>

            {renderTerms()}
          </div>
        </>
      )}
    </div>
  );
};

export default MajorSelectCard;
