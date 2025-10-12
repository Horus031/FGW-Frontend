
import TabsContainer from "../../../components/SchedulePage/TabsContainer"
import PageTitle from "../../../components/shared/PageTitle"

const SchedulePage = () => {
  return (
    <div className="space-y-12">
      <PageTitle title="Schedule" breadcrumb="Schedule" subtitle="Activities for Vo Minh Nghia" />

      <TabsContainer/>
    </div>
  )
}

export default SchedulePage
