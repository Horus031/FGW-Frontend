import { useState, useEffect } from "react";
import FeedbackContainer from "../../../components/FeedbackPage/FeedbackContainer";
import PageTitle from "../../../components/shared/PageTitle";
import FeedbackForm from "../../../components/StudentFeedbackPage/FeedbackForm";
import InstructorList from "../../../components/StudentFeedbackPage/InstructorList";
import { useUserStore } from "../../../store/user";
import { getStudentFeedbackForms, submitStudentFeedback } from "../../../api/requests/feedback.api";
import type { StudentFeedbackFormsResponse, FeedbackAnswer } from "../../../models/feedback";
import LoadingPage from "../../../components/shared/LoadingPage";

const StudentFeedbackPage = () => {
  const { user } = useUserStore();
  const [feedbackData, setFeedbackData] = useState<StudentFeedbackFormsResponse | null>(null);
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role?.name === "Student") {
      fetchFeedbackForms();
    }
  }, [user]);

  const fetchFeedbackForms = async () => {
    try {
      setLoading(true);
      setError(null);
      // Use a default term ID or get it from user store/context
      const termId = "8"; // You might want to get this from user context or state
      const data = await getStudentFeedbackForms(termId);
      setFeedbackData(data);
      
      if (data.forms.length > 0) {
        setActiveFormIndex(0);
      }
    } catch (err) {
      console.error("Error fetching feedback forms:", err);
      setError("Failed to load feedback forms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectForm = (index: number) => {
    setActiveFormIndex(index);
  };

  const handleSubmitFeedback = async (answers: FeedbackAnswer[], notes: string) => {
    if (!feedbackData || !feedbackData.forms[activeFormIndex]) {
      throw new Error("No feedback form selected");
    }

    const selectedForm = feedbackData.forms[activeFormIndex];

    setIsSubmitting(true);
    try {
      await submitStudentFeedback({
        staffId: parseInt(selectedForm.staffId, 10),
        courseId: parseInt(selectedForm.courseId, 10),
        classId: parseInt(selectedForm.classId, 10),
        termId: parseInt(selectedForm.termId, 10),
        answers,
        notes,
      });
      
      // Update the form status to submitted
      setFeedbackData(prev => {
        if (!prev) return prev;
        const updatedForms = [...prev.forms];
        updatedForms[activeFormIndex] = {
          ...updatedForms[activeFormIndex],
          isSubmitted: true,
        };
        return {
          ...prev,
          forms: updatedForms,
        };
      });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      throw err; // Re-throw to let FeedbackForm handle the error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={user?.role?.name === "Student" ? "space-y-6" : "space-y-8"}>
      <PageTitle breadcrumb="Feedback" />

      {user?.role?.name === "Student" ? (
        <div className="space-y-6">
          {loading ? (
              <LoadingPage />
          ) : error ? (
            <div className="flex items-center justify-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          ) : feedbackData ? (
            <>
              <InstructorList
                forms={feedbackData.forms}
                activeFormIndex={activeFormIndex}
                onSelectForm={handleSelectForm}
              />

              <FeedbackForm
                questions={feedbackData.questions}
                selectedForm={feedbackData.forms[activeFormIndex] || null}
                onSubmit={handleSubmitFeedback}
                isSubmitting={isSubmitting}
              />
            </>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <p>No feedback forms available</p>
            </div>
          )}
        </div>
      ) : (
        <FeedbackContainer />
      )}
    </div>
  );
};

export default StudentFeedbackPage;
