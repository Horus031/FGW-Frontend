import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseFeedbackList from "./CourseFeedbackList";
import FeedbackTable from "./FeedbackTable";
import { getTeacherFeedbacks, type CourseFeedbackGroup } from "../../models/feedback";

const FeedbackContainer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["teacher-feedbacks"],
    queryFn: () => getTeacherFeedbacks(), // optionally pass teacherId
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const groups: CourseFeedbackGroup[] = data ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const listData = groups.map((g) => ({
    classCode: g.classCode,
    courseName: g.courseName,
  }));

  const tableData = groups[selectedIndex]?.feedbacks ?? [];

  if (isLoading) return null;

  return (
    <div className="space-y-4.5">
      <CourseFeedbackList
        data={listData}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <FeedbackTable data={tableData} />
    </div>
  );
};

export default FeedbackContainer;