import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Table, { type ColumnConfig } from "../shared/Table";

type ClassData = {
  no: number;
  classCode: string;
  className: string;
  planAttend: number;
  attended: number;
};

const SubTableDetails = () => {
  const [open, setOpen] = useState(false);

  const classData: ClassData[] = [
    {
      no: 1,
      classCode: "BUSI1323",
      className: "Leadership in Organizations",
      planAttend: 15,
      attended: 14,
    },
    {
      no: 2,
      classCode: "BUSI1632",
      className: "Negotiations",
      planAttend: 15,
      attended: 15,
    },
    {
      no: 3,
      classCode: "DESI1219",
      className: "Design Thinking",
      planAttend: 15,
      attended: 13,
    },
    {
      no: 4,
      classCode: "COMP1682",
      className: "Computer Networks",
      planAttend: 15,
      attended: 15,
    },
    {
      no: 5,
      classCode: "BUSI1205",
      className: "Business Analytics",
      planAttend: 15,
      attended: 12,
    },
  ];

  const columns: ColumnConfig<ClassData>[] = [
    {
      key: "no",
      title: "No.",
      width: "80px",
    },
    {
      key: "classCode",
      title: "Class",
      width: "auto",
      render: (_, row) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-primary">{row.classCode}</span>
          <span className="text-sm text-gray-600">{row.className}</span>
        </div>
      ),
    },
    {
      key: "planAttend",
      title: "Plan",
      width: "120px",
    },
    {
      key: "attended",
      title: "Attended",
      width: "120px",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        className="ml-auto w-fit border-secondary text-secondary hover:text-secondary cursor-pointer"
      >
        {open ? "Hide Details" : "Show Details"}
        {open ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {open && (
        <div className="w-full overflow-x-auto">
          <Table
            columns={columns}
            data={classData}
            color="bg-primary"
            textColor="text-white"
            bordered
            textSize="text-sm"
            grade
            headHeight="h-14"
            bodyHeight="h-17"
            padding="px-4 py-3"
            summary
          />
        </div>
      )}
    </div>
  );
};

export default SubTableDetails;
