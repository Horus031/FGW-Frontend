import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";

const SchedulePage = () => {
  return (
    <div className="flex flex-col gap-4.5">
      <PageTitle breadcrumb="Schedule" />

      <TabsContainer />
    </div>
  );
};

export default SchedulePage;
