export type FeedbackRowData = {
  id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  gpa: number;
  comment: string;
};

export type CourseFeedbackGroup = {
  classCode: string;
  courseName: string;
  feedbacks: FeedbackRowData[];
};

export async function getTeacherFeedbacks(): Promise<CourseFeedbackGroup[]> {
  // mock data
  const mk = (id: number, gpa: number, comment = "Good Teacher"): FeedbackRowData => ({
    id,
    q1: 4,
    q2: 4,
    q3: 4,
    q4: 4,
    q5: 4,
    gpa,
    comment,
  });

  return [
    {
      classCode: "DESI1219.1",
      courseName: "Design Research Project",
      feedbacks: [mk(1, 4), mk(2, 3.8), mk(3, 4), mk(4, 3.9), mk(5, 4)],
    },
    {
      classCode: "CS101",
      courseName: "Introduction to Computer Science",
      feedbacks: [mk(1, 3.6), mk(2, 3.7), mk(3, 3.9), mk(4, 4), mk(5, 3.8)],
    },
    {
      classCode: "SE201",
      courseName: "Software Engineering Fundamentals",
      feedbacks: [mk(1, 3.5), mk(2, 3.6), mk(3, 3.7)],
    },
  ];
}