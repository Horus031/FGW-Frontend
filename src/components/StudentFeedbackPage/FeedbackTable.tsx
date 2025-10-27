import  Table  from "../../components/shared/Table";
import { FEEDBACK_QUESTIONS } from "../../constants/constants";
import type { ColumnConfig } from "../shared/Table";

type FeedbackRowData = {
  id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  gpa: number;
  comment: string;
};

const data = [
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
  {
    id: 1,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa: 4,
    comment: "Good Teacher",
  },
];

const FeedbackTable = () => {
  const columns: ColumnConfig<FeedbackRowData>[] = [
    { key: "id", title: "HIT", width: "88px" },
    ...FEEDBACK_QUESTIONS.map((_, index) => ({
      key: `q${index + 1}` as keyof FeedbackRowData,
      title: `Q${index + 1}`,
      width: "112px",
    })),

    { key: "gpa", title: "GPA", width: "112px" },
    { key: "comment", title: "Comment for Teacher", width: "408px" },
  ];

  return (
    <div>
      <Table columns={columns} data={data} feedback headHeight="h-13" padding="p-4" />
    </div>
  );
};

export default FeedbackTable;
