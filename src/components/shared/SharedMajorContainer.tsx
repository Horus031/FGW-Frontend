import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProgrammes } from "../../api/requests/programme.api";
import { getAllTerms } from "../../api/requests/term.api";
import type { MajorState } from "../../models/major";
import type { Term } from "../../models/term";
import type { Programme } from "../../models/programme";

type ContextValue = {
  major: MajorState;
  setMajor: React.Dispatch<React.SetStateAction<MajorState>>;
  programmeData?: Programme[];
  termData?: Term[];
  isLoading: boolean;
};

const SharedMajorContext = createContext<ContextValue | undefined>(undefined);

const defaultMajor: MajorState = {
  programme: { index: 0, id: 0 },
  year: { index: 0, academicYear: "" },
  semester: { index: 0, code: "" },
  term: { index: 0, id: 0 },
  major: { index: 0, id: 0 },
};

type ProviderProps = {
  children: React.ReactNode;
  initialMajor?: MajorState;
};

export function SharedMajorProvider({ children, initialMajor = defaultMajor }: ProviderProps) {
  const [major, setMajor] = useState<MajorState>(initialMajor);

  const { data: programmeData } = useQuery({
    queryKey: ["programmes"],
    queryFn: () => getAllProgrammes(),
  });

  // Fetch terms for selected programme only. Year/semester selection is filtered locally.
  const { data: termData, isLoading } = useQuery({
    queryKey: ["terms", major.programme.id],
    queryFn: () => getAllTerms(major.programme.id),
    enabled: !!major.programme.id,
  });

  // If provider was mounted without an initial programme (id = 0), initialize
  // the major.programme to the first programme returned from the API so
  // consumers (like TimetableContainer) can immediately start their queries.
  useEffect(() => {
    if ((!major?.programme?.id || major.programme.id === 0) && programmeData && programmeData.length > 0) {
      const first = programmeData[0];
      setMajor((prev) => ({
        ...prev,
        programme: { index: 0, id: Number(first.id) },
      }));
    }
    // We intentionally only depend on programmeData and major.programme.id to
    // run this once when programmes arrive or when major is still empty.
  }, [programmeData, major?.programme?.id]);

  const value = useMemo(() => ({ major, setMajor, programmeData, termData, isLoading }), [major, setMajor, programmeData, termData, isLoading]);


  return <SharedMajorContext.Provider value={value}>{children}</SharedMajorContext.Provider>;

}

// eslint-disable-next-line react-refresh/only-export-components
export function useSharedMajor() {
  const ctx = useContext(SharedMajorContext);
  if (!ctx) throw new Error("useSharedMajor must be used within SharedMajorProvider");
  return ctx;
}

export default SharedMajorProvider;