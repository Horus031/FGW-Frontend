import FeedbackContainer from "../../../components/FeedbackPage/FeedbackContainer";
import PageTitle from "../../../components/shared/PageTitle";
import FeedbackForm from "../../../components/StudentFeedbackPage/FeedbackForm";
import InstructorList from "../../../components/StudentFeedbackPage/InstructorList";
import { useUserStore } from "../../../store/user";

const StudentFeedbackPage = () => {
  const { user } = useUserStore();
  return (
    <div className={user?.role?.name === "Student" ? "space-y-6" : "space-y-8"}>
      <PageTitle breadcrumb="Feedback" />

      {user?.role?.name === "Student" ? (
        <div className="space-y-6">
          <InstructorList />

          <FeedbackForm />
        </div>
      ) : (
        <FeedbackContainer/>
      )}
    </div>
  );
};

export default StudentFeedbackPage;
