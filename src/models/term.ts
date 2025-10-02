export type TermSeason = "Spring" | "Summer" | "Fall";

export type Term = {
  season: TermSeason;
  year: number;
  label: string;
};

export type TermData = Term[];

export type CourseByTerm<T> = {
  term: Term;
  courses: T[];
  selectedCourse: T | null;
};
