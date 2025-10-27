import { NavLink } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const PendingFeedbackPage = () => {
  return (
    <div className="flex justify-center items-center my-40">
      <div className="text-primary text-center w-[1056px] space-y-2">
        <h2 className="text-2xl font-bold">
          Now is the time to take feedbacks on teachers and subjects which you
          are learning.
        </h2>
        <div className="flex flex-col gap-5 items-center justify-center">
          <p className="font-medium text-gray-800">
            Your feedback helps Greenwich University improve teaching quality.
            Please complete all feedback before viewing your learning
            information. This page will remain until all feedback and attendance
            are submitted.
          </p>
          <NavLink to="/feedback">
            <Button className="bg-secondary px-6 py-1.5">Go to Feedback</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PendingFeedbackPage;
