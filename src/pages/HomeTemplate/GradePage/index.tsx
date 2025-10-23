import GradeReportTable from "../../../components/GradePage/GradeReportTable";
import GradeSearch from "../../../components/GradePage/GradeSearch";
import PageTitle from "../../../components/shared/PageTitle";

const GradePage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Grade Report for Student" />

      <GradeSearch />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Grade Report for Võ Minh Nghĩa (GCS...)</h2>
        <GradeReportTable/>
      </div>
    </div>
  );
};

export default GradePage;
