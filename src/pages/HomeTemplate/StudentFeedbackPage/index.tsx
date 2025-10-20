import PageTitle from "../../../components/shared/PageTitle"
import FeedbackForm from "../../../components/StudentFeedbackPage/FeedbackForm"
import InstructorList from "../../../components/StudentFeedbackPage/InstructorList"

const StudentFeedbackPage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Feedback"/>

      <InstructorList/>

      <FeedbackForm/>
    </div>
  )
}

export default StudentFeedbackPage
