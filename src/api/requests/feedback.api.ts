import type { StudentFeedbackFormsResponse, SubmitFeedbackRequest } from "../../models/feedback";
import api from "../apiRequest";

export const getStudentFeedbackForms = async (termId: string): Promise<StudentFeedbackFormsResponse> => {
  const response = await api.get<StudentFeedbackFormsResponse>(`/feedback/student/forms?termId=${termId}`);
  return response.data;
};

export const submitStudentFeedback = async (feedbackData: SubmitFeedbackRequest): Promise<void> => {
  await api.post("/feedback/submit", feedbackData);
};
