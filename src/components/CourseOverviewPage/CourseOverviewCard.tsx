
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../models/course';
import type { Term } from '../../models/term';
import type { UserInfo } from '../../models/user';

interface CourseOverviewCardProps {
  course?: Course;
  term?: Term;
  students?: Pick<UserInfo, "avatar">[];
}
const CourseOverviewCard = ({
  course,
  students = []
}: CourseOverviewCardProps) => {
  const navigate = useNavigate();
  if (!course) return null;
  if (!course) return null;
  const maxVisibleAvatars = 4;
  const visibleAvatars = students.slice(0, maxVisibleAvatars);
  const remainingCount = students.length - maxVisibleAvatars;

  const handleClick = () => {
    // Pass the full course data via state
    navigate('/course-detail', {
      state: {
        course: {
          code: course.classCode,
          title: course.courseName,
          teacherId: course.instructor,
          slot: course.totalSlots,
          // Add other fields from your API
        }
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-fit">
      {/* Header */}
      <div className="mb-3">
        <p className="text-sm font-medium text-[var(--color-gray-weak)] mb-1">{course.courseTerm}</p>
        <h5
          className="text-2xl font-bold text-[var(--color-primary)] hover:opacity-70 cursor-pointer truncate"
          title={course.courseName}
          onClick={handleClick}
        >
          {course.courseName}
        </h5>

      </div>

      {/* Instructor */}
      <p className="text-sm text-[var(--color-primary)] mb-2">
        Instructor: <span className="font-medium">{course.instructor}</span>
      </p>

      {/* Class Code and Avatars */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--color-primary)]">
          Class: <span className="font-medium">{course.classCode}</span>
        </p>

        {/* Avatar Group */}
        <div className="flex items-center -space-x-2">
          {visibleAvatars.map((student, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-[var(--color-primary)]"
            >
              <img
                src={student.avatar || ''}
                alt="Student"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-[var(--color-primary)]">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-1">
        <span>Slot {course.totalSlots}</span>
        <span>{course.attendancePercent}% complete</span>
      </div>
    </div>
  );
};

export default CourseOverviewCard;