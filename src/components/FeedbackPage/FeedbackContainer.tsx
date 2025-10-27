import { useState, useEffect } from "react";
import CourseFeedbackList from "./CourseFeedbackList";
import FeedbackTable from "./FeedbackTable";
import {
  getTeacherFeedbacks,
  type CourseFeedbackGroup,
} from "../../models/feedback";

const FeedbackContainer = () => {
  const [groups, setGroups] = useState<CourseFeedbackGroup[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getTeacherFeedbacks().then((data) => {
      setGroups(data ?? []);
    });
  }, []);

  const listData = groups.map((g) => ({
    classCode: g.classCode,
    courseName: g.courseName,
  }));

  const tableData = groups[selectedIndex]?.feedbacks ?? [];


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
