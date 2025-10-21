import PageTitle from "../../../components/shared/PageTitle";
import FeedbackForm from "../../../components/StudentFeedbackPage/FeedbackForm";
import FeedbackTable from "../../../components/StudentFeedbackPage/FeedbackTable";
import InstructorList from "../../../components/StudentFeedbackPage/InstructorList";
import { useUserStore } from "../../../store/user";

const StudentFeedbackPage = () => {
  const { user } = useUserStore();
  return (
    <div className={user?.role?.name === "Student" ? "space-y-4.5" : "space-y-8"}>
      <PageTitle breadcrumb="Feedback" />

      {user?.role?.name === "Student" ? (
        <div>
          <InstructorList />

          <FeedbackForm />
        </div>
      ) : (
        <FeedbackTable />
      )}
    </div>
  );
};

export default StudentFeedbackPage;
