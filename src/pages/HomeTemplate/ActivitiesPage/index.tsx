import ActivitiesContainer from "../../../components/ActivitiesPage/ActivitiesContainer"
import PageTitle from "../../../components/shared/PageTitle"

const ActivitiesPage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="View Activities" />

      <ActivitiesContainer/>
    </div>
  )
}

export default ActivitiesPage
