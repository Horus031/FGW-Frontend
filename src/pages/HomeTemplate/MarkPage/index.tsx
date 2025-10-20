import MarkCourse from "../../../components/MarkPage/MarkCourse";
import MarkTable from "../../../components/MarkPage/MarkTable";
import PageTitle from "../../../components/shared/PageTitle";
import TermSelect from "../../../components/shared/TermSelect";

const MarkPage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle
        breadcrumb="Mark Report"
      />

      <div className="flex flex-col gap-6">
        <TermSelect />

        <div className="flex gap-12">
          <div className="flex flex-col gap-2.5 w-5/12">
            <MarkCourse />
            <MarkCourse />
            <MarkCourse />
          </div>
          <div className="w-7/12">
            <MarkTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkPage;
