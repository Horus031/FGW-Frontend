import { useState } from "react";
import GradeReportTable from "../../../components/GradePage/GradeReportTable";
import GradeSearch from "../../../components/GradePage/GradeSearch";
import PageTitle from "../../../components/shared/PageTitle";

const GradePage = () => {
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleStudentSelect = (student: string) => {
    setSelectedStudent(student);
  };
  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Grade Report for Student" />

      <GradeSearch onStudentSelect={handleStudentSelect} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">
          {selectedStudent
            ? `Grade Report for ${selectedStudent}`
            : "Grade Report for Student"}
        </h2>
        <GradeReportTable />
      </div>
    </div>
  );
};

export default GradePage;
