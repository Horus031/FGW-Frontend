import type { Department } from "./department";
import type { Programme } from "./programme";

export type TermSeason = "Spring" | "Summer" | "Fall";

// export type Term = {
//   season: TermSeason;
//   year: number;
//   label: string;
// };

// export type TermData = Term[];

// export type CourseByTerm<T> = {
//   term: Term;
//   courses: T[];
//   selectedCourse: T | null;
// };

export type Term = {
  id: string;
  programmeId: string;
  programme: Programme;
  code: string;
  name: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  departments: Department[];
}


