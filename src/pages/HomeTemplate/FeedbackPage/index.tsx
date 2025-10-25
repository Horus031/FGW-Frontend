import PageTitle from "../../../components/shared/PageTitle";
import FeedbackContainer from "../../../components/FeedbackPage/FeedbackContainer";
import FeedbackForm from "../../../components/FeedbackPage/FeedbackForm";
import InstructorList from "../../../components/FeedbackPage/InstructorList";
// import { useUserStore } from "../../../store/user";

const FeedbackPage = () => {
  // const { user } = useUserStore();
  const role = localStorage.getItem("role");
  return (
    <div className={role === "Student" ? "space-y-6" : "space-y-8"}>
      <PageTitle breadcrumb="Feedback" />

      {role === "Student" ? (
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

export default FeedbackPage;
