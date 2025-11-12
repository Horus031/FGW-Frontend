import { useQuery } from "@tanstack/react-query";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getAllProgrammes } from "../../api/requests/programme.api";
import { getAllTerms } from "../../api/requests/term.api";
import type { MajorState } from "../../models/major";
import { uniqueSet } from "../../utils/uniqueSet";
import SummaryPicker from "../TeachingSummaryPage/SummaryPicker";
import SkeletonDemo from "./SkeletonLoading";

type MajorSelectCardProps = {
  isSummary?: boolean;
  noMajor?: boolean;
  major: MajorState;
  setMajor: Dispatch<SetStateAction<MajorState>>;
  // when used in summary mode, allow parent to control the from/to dates
  summaryFrom?: Date | undefined;
  summaryTo?: Date | undefined;
  setSummaryFrom?: Dispatch<SetStateAction<Date | undefined>>;
  setSummaryTo?: Dispatch<SetStateAction<Date | undefined>>;
};

const MajorSelectCard = (props: MajorSelectCardProps) => {
  const {
    isSummary,
    noMajor,
    major,
    setMajor,
    summaryFrom,
    summaryTo,
    setSummaryFrom,
    setSummaryTo,
  } = props;
  const [uniqueYear, setUniqueYear] = useState<string[]>([]);
  const lastProgrammeRef = useRef<number | null>(null);
  const { data: programmeData } = useQuery({
    queryKey: ["programmes"],
    queryFn: () => getAllProgrammes(),
    staleTime: 2 * 60 * 1000,
  });

  const { data: termData, isLoading } = useQuery({
    queryKey: ["terms", major.programme.id],
    queryFn: () => getAllTerms(major.programme.id),
    enabled: !!major.programme.id,
    staleTime: 2 * 60 * 1000,
  });

  const semestersForSelectedYear = useMemo(() => {
    if (!termData || !major.year.academicYear) return [];
    const list = termData
      .filter((t) => t.academicYear === major.year.academicYear)
      .map((t) => ({ code: t.code || "", name: t.name || t.code || "" }));
    const codes = Array.from(uniqueSet(list.map((s) => s.code)));
    return codes.map((code) => list.find((s) => s.code === code) || { code, name: code });
  }, [termData, major.year.academicYear]);

  const termItemsForSelection = useMemo(() => {
    if (!termData) return [];
    // if a semester code is selected, narrow down to that semester, otherwise all terms for year
    return termData.filter(
      (t) =>
        t.academicYear === major.year.academicYear &&
        (major.semester.code ? t.code === major.semester.code : true)
    );
  }, [termData, major.year.academicYear, major.semester.code]);

  const uniqueDepartmentsForSelection = useMemo(() => {
    // collect departments from the selected term items and dedupe by id
    const deps = termItemsForSelection.flatMap((t) => t.departments || []);
    const seen = new Set<string>();
    const uniq: { id: string; name: string }[] = [];
    deps.forEach((d) => {
      if (!d) return;
      if (!seen.has(d.id)) {
        seen.add(d.id);
        uniq.push({ id: d.id, name: d.name });
      }
    });
    return uniq;
  }, [termItemsForSelection]);

  const majorRef = useRef(major);
  useEffect(() => {
    majorRef.current = major;
  }, [major]);

  useEffect(() => {
    if (!major.programme.id) {
      queueMicrotask(() => {
        setUniqueYear([]);
        setMajor((prev) => ({
          ...prev,
          year: { index: 0, academicYear: "" },
          term: { index: 0, id: 0 },
          semester: { index: 0, code: "" },
          major: { index: 0, id: 0 },
        }));
      });
      return;
    }

    if (!termData || termData.length === 0) {
      queueMicrotask(() => setUniqueYear([]));
      return;
    }

    if (lastProgrammeRef.current === major.programme.id) return;

    const years = Array.from(uniqueSet(termData.map((item) => item.academicYear || "")));
    const firstYear = years[0] || "";

    queueMicrotask(() => setUniqueYear(years));

    if (major.year.academicYear !== firstYear) {
      const termsForYear = termData.filter((t) => t.academicYear === firstYear);
      const firstTerm = termsForYear[0];
      const firstDept = firstTerm?.departments?.[0] || null;

      queueMicrotask(() => {
        setMajor((prev) => ({
          ...prev,
          year: { index: 0, academicYear: firstYear },
          semester: { index: 0, code: firstTerm?.code || "" },
          term: { index: 0, id: Number(firstTerm?.id) || 0 },
          major: { index: 0, id: Number(firstDept?.id) || 0 },
        }));
      });
    }

    lastProgrammeRef.current = major.programme.id;
  }, [major.programme.id, termData, major.year.academicYear, setMajor]);

  const handleSetMajor = useCallback(
    (
      title: "programme" | "year" | "semester" | "major",
      subtitle: "id" | "academicYear" | "code",
      index: number,
      id: string | number
    ) => {
      // avoid unnecessary updates where possible
      if (majorRef.current[title].index === index) return;

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
        // try to pick the first term/department for this year from termData
        const termsForYear = (termData || []).filter((t) => t.academicYear === value);

        if (termsForYear.length > 0) {
          const firstTerm = termsForYear[0];
          const firstDept = (firstTerm.departments && firstTerm.departments[0]) || null;
          setMajor((prev) => ({
            ...prev,
            year: { index, academicYear: value },
            semester: { index: 0, code: firstTerm.code || "" },
            term: { index: 0, id: Number(firstTerm.id) || 0 },
            major: { index: 0, id: Number(firstDept?.id) || 0 },
          }));
        } else {
          // fallback: clear dependent selections
          setMajor((prev) => ({
            ...prev,
            year: { index, academicYear: value },
            semester: { index: 0, code: "" },
            term: { index: 0, id: 0 },
            major: { index: 0, id: 0 },
          }));
        }

        return;
      }

      if (title === "semester") {
        const code = id as string;
        // determine terms that match current year and the selected semester code
        const termsForSemester = (termData || []).filter(
          (t) => t.academicYear === majorRef.current.year.academicYear && t.code === code
        );

        if (termsForSemester.length > 0) {
          const firstTerm = termsForSemester[0];
          const firstDept = (firstTerm.departments && firstTerm.departments[0]) || null;
          setMajor((prev) => ({
            ...prev,
            semester: { index, code },
            term: { index: 0, id: Number(firstTerm.id) || 0 },
            major: { index: 0, id: Number(firstDept?.id) || 0 },
          }));
          return;
        }

        // fallback to setting only the semester code
        setMajor((prev) => ({
          ...prev,
          semester: { index, code },
        }));
        return;
      }

      // generic branch for setting major id (or other single-field updates)
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
    },
    [setMajor, termData]
  );

  const programmeButtons = useMemo(() => {
    return programmeData?.map((item, index) => (
      <button
        onClick={() => handleSetMajor("programme", "id", index, item.id)}
        key={item.id ?? index}
        className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${major.programme.index === index ? "border-1 bg-gray/0 border-bright text-secondary" : ""
          }`}
      >
        {item.name}
      </button>
    ));
  }, [programmeData, handleSetMajor, major.programme.index]);

  const termsBlock = useMemo(() => {
    return (
      <>
        <div className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">Year:</span>
          </div>
          <div className="flex items-center gap-2 w-fit">
            {uniqueYear.map((item, index) => (
              <button
                onClick={() => handleSetMajor("year", "academicYear", index, item)}
                key={item + index}
                className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${major.year.index === index
                    ? "border-1 bg-gray/0 border-bright text-secondary"
                    : ""
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">Semester:</span>
          </div>
          <div className="flex items-center gap-2 w-fit">
            {semestersForSelectedYear.map((s, index) => (
              <button
                onClick={() => handleSetMajor("semester", "code", index, s.code)}
                key={s.code + index}
                className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${major.semester.index === index
                    ? "border-1 bg-gray/0 border-bright text-secondary"
                    : ""
                  }`}
              >
                {s.code}
              </button>
            ))}
          </div>
        </div>

        {isSummary ? (
          <div className="flex items-center gap-8 py-2">
            <div className="text-right text-primary w-[80px]">
              <span className="text-sm font-medium w-fit">From:</span>
            </div>
            <div className="flex items-center gap-2 w-fit font-semibold">
              <SummaryPicker selected={summaryFrom} onSelect={setSummaryFrom} /> to{" "}
              <SummaryPicker selected={summaryTo} onSelect={setSummaryTo} />
            </div>
          </div>
        ) : (
          !noMajor && (
            <div className="flex items-center gap-8 py-2">
              <div className="text-right text-primary w-[80px]">
                <span className="text-sm font-medium w-fit">Major:</span>
              </div>
              <div className="flex items-center gap-2 w-fit">
                {uniqueDepartmentsForSelection.map((dep, index) => (
                  <button
                    onClick={() => handleSetMajor("major", "id", index, dep.id)}
                    key={dep.id}
                    className={`px-2 py-0.5 rounded-sm text-base cursor-pointer active:scale-95 ${major.major.index === index
                        ? "border-1 bg-gray/0 border-bright text-secondary"
                        : ""
                      }`}
                  >
                    {dep.name}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </>
    );
  }, [
    uniqueYear,
    semestersForSelectedYear,
    isSummary,
    summaryFrom,
    setSummaryFrom,
    summaryTo,
    setSummaryTo,
    noMajor,
    uniqueDepartmentsForSelection,
    major.year.index,
    major.semester.index,
    major.major.index,
    handleSetMajor,
  ]);

  return (
    <div
      className={`${!isSummary ? "basis-7/12" : "w-full h-57"
        } px-3 py-2 border-1 border-gray-400 whitespace-nowrap rounded-lg`}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <SkeletonDemo skeletonNum={9} />
        </div>
      ) : (
        <>
          <div className="pt-3 py-2">
            <div className="flex items-center gap-8 py-2">
              <div className="text-right text-primary w-[80px]">
                <span className="text-sm font-medium w-fit">Programme:</span>
              </div>
              <div className="flex items-center gap-2 w-fit">{programmeButtons}</div>
            </div>

            {termsBlock}
          </div>
        </>
      )}
    </div>
  );
};

export default MajorSelectCard;
