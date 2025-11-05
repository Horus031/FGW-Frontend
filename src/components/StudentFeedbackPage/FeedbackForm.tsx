import { useState, useEffect } from "react";
import type { FeedbackQuestion, FeedbackForm as FeedbackFormType, FeedbackAnswer } from "../../models/feedback";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

type FeedbackFormProps = {
  questions: FeedbackQuestion[];
  selectedForm: FeedbackFormType | null;
  onSubmit: (answers: FeedbackAnswer[], notes: string) => Promise<void>;
  isSubmitting?: boolean;
};

const FeedbackForm = ({ 
  questions, 
  selectedForm, 
  onSubmit, 
  isSubmitting = false
}: FeedbackFormProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Pre-populate form with submitted data when form changes
  useEffect(() => {
    if (selectedForm?.isSubmitted && selectedForm.submission) {
      // Convert FeedbackAnswer[] to Record<string, string>
      const answersRecord = selectedForm.submission.answers.reduce((acc, answer) => {
        acc[answer.questionId] = answer.selectedOption;
        return acc;
      }, {} as Record<string, string>);
      
      setAnswers(answersRecord);
      setNotes(selectedForm.submission.notes || "");
    } else {
      // Reset form when not submitted
      setAnswers({});
      setNotes("");
    }
    // Clear messages when form changes
    setError(null);
    setSuccess(null);
  }, [selectedForm]);

  const handleAnswerChange = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const renderQuestions = () => {
    // Group questions into rows (2 per row)
    const rows: Array<typeof questions> = [];
    for (let i = 0; i < questions.length; i += 2) {
      rows.push(questions.slice(i, i + 2));
    }

    return (
      <div className="flex flex-col">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`grid grid-cols-2 gap-x-16 pb-6  ${rowIndex < rows.length - 1 ? 'border-b mb-6 border-gray-300' : ''}`}
          >
            {row.map((question) => (
              <div key={question.id} className="flex flex-col gap-3">
                {/* Question Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-[600]">
                    {question.questionOrder}. {question.questionText}
                  </span>
                  {/* Vietnamese subtitle */}
                  {question.questionTextVi && (
                    <span className="text-sm text-gray-600 pl-5">
                      ({question.questionTextVi})
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {question.options && question.options.length > 0 ? (
                    question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-3">
                        <input
                          className="w-5 h-5 accent-[#005EB8] cursor-pointer"
                          type="radio"
                          name={`question-${question.id}`}
                          id={`${question.id}-${optionIndex}`}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          disabled={isSubmitting}
                        />
                        <label 
                          htmlFor={`${question.id}-${optionIndex}`} 
                          className="text-[14px] text-[#00033D] cursor-pointer select-none font-[500]"
                        >
                          {option.label}{" "}
                          <span className="text-[#00033D] italic font-[400]">({option.labelVi})</span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No options available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setError(null);
    setSuccess(null);
    
    if (!selectedForm) {
      setError("Please select a feedback form");
      return;
    }

    // Validate that all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      setError("Please answer all questions before submitting");
      return;
    }

    const feedbackAnswers: FeedbackAnswer[] = questions.map(q => ({
      questionId: q.id,
      selectedOption: answers[q.id]
    }));

    const isUpdating = selectedForm.isSubmitted;

    try {
      await onSubmit(feedbackAnswers, notes);
      // Show success message
      setSuccess(isUpdating ? "Feedback updated successfully!" : "Feedback submitted successfully!");
      setError(null);
    } catch {
      setError(isUpdating ? "Failed to update feedback. Please try again." : "Failed to submit feedback. Please try again.");
      setSuccess(null);
    }
  };

  if (!selectedForm) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        Please select a feedback form from above
      </div>
    );
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="px-8 py-6 border border-gray-300 rounded-lg bg-white">
          {questions.length > 0 ? renderQuestions() : <p>No questions available</p>}
        </div>

        <div className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] text-gray-900">
              Remarks - Suggestions for improvement
            </span>
            <span className="text-sm text-gray-600">(Ghi chú - đề nghị cải tiến)</span>
          </div>

          <textarea
            name="notes"
            value={notes}
            onChange={handleNotesChange}
            className="w-full max-w-2xl h-40 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your remarks here..."
            disabled={isSubmitting}
          ></textarea>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-fit bg-secondary px-8 py-3 text-white font-semibold hover:opacity-70"
            size="lg"
          >
            {isSubmitting ? (
              selectedForm.isSubmitted ? "Updating..." : "Submitting..."
            ) : selectedForm.isSubmitted ? (
              "Update Feedback"
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
