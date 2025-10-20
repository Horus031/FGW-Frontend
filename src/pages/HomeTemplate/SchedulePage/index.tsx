import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";

const SchedulePage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Schedule" />

      <TabsContainer />
    </div>
  );
};

export default SchedulePage;
