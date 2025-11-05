import { useState, useEffect } from "react";
import FeedbackContainer from "../../../components/FeedbackPage/FeedbackContainer";
import PageTitle from "../../../components/shared/PageTitle";
import FeedbackForm from "../../../components/StudentFeedbackPage/FeedbackForm";
import InstructorList from "../../../components/StudentFeedbackPage/InstructorList";
import { useUserStore } from "../../../store/user";
import { getStudentFeedbackForms, submitStudentFeedback, updateStudentFeedback } from "../../../api/requests/feedback.api";
import type { StudentFeedbackFormsResponse, FeedbackAnswer } from "../../../models/feedback";
import { Skeleton } from "../../../components/ui/skeleton";
import { getCurrentTerm } from "../../../api/requests/term.api";

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
      const term = await getCurrentTerm();
      const data = await getStudentFeedbackForms(term.id);
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
    const feedbackPayload = {
      staffId: selectedForm.staffId,
      courseId: selectedForm.courseId,
      classId: selectedForm.classId,
      termId: selectedForm.termId,
      answers,
      notes,
    };

    setIsSubmitting(true);
    try {
      // Use update API if already submitted, otherwise use submit API
      if (selectedForm.isSubmitted) {
        await updateStudentFeedback(feedbackPayload);
      } else {
        await submitStudentFeedback(feedbackPayload);
      }
      
      // Update the form status and submission data in local state
      setFeedbackData(prev => {
        if (!prev) return prev;
        const updatedForms = [...prev.forms];
        updatedForms[activeFormIndex] = {
          ...updatedForms[activeFormIndex],
          isSubmitted: true,
          submission: {
            answers,
            notes,
            submittedAt: new Date().toISOString(),
          },
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
            <div className="space-y-6">
              {/* Skeleton for instructor cards */}
              <div className="flex items-center gap-6 overflow-x-auto pb-2">
                <Skeleton className="h-24 w-[280px] rounded-lg" />
                <Skeleton className="h-24 w-[280px] rounded-lg" />
                <Skeleton className="h-24 w-[280px] rounded-lg" />
              </div>
              {/* Skeleton for form */}
              <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-red-500 text-lg font-semibold mb-2">Unable to Load Feedback Forms</div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : feedbackData && feedbackData.forms.length > 0 ? (
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
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-gray-700 text-lg font-semibold mb-2">No Feedback Forms Available</div>
              <p className="text-gray-500">There are currently no feedback forms to complete for this term.</p>
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
