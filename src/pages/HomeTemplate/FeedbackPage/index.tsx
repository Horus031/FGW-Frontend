import PageTitle from "../../../components/shared/PageTitle";
import FeedbackForm from "../../../components/FeedbackPage/FeedbackForm";
import InstructorList from "../../../components/FeedbackPage/InstructorList";
import { useUserStore } from "../../../store/user";

import FeedbackContainer from "../../../components/FeedbackPage/FeedbackContainer";

const FeedbackPage = () => {
  const { user } = useUserStore();
  return (
    <div
      className={user?.role?.name === "Student" ? "space-y-4.5" : "space-y-8"}
    >
      <PageTitle breadcrumb="Feedback" />

      <div className="space-y-4.5">
        {user?.role?.name === "Student" ? (
          <div>
            <InstructorList />

            <FeedbackForm />
          </div>
        ) : (
          <FeedbackContainer />
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
