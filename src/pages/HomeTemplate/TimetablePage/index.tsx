import PageTitle from "../../../components/shared/PageTitle"
import TimetableContainer from "../../../components/TimetablePage/TimetableContainer"

const TimetablePage = () => {
  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Timetable by Group" />

      <TimetableContainer/>
    </div>
  )
}

export default TimetablePage
