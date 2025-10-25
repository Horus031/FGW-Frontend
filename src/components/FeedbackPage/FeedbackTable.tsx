import Table, { type ColumnConfig } from "../shared/Table";
import { FEEDBACK_QUESTIONS } from "../../constants/constants";
import type { FeedbackRowData } from "../../models/feedback";

type FeedbackTableProps = {
  data: FeedbackRowData[];
};

const FeedbackTable = ({ data }: FeedbackTableProps) => {
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
      <Table columns={columns} data={data} feedback height="h-13" padding="p-4" />
    </div>
  );
};

export default FeedbackTable;
