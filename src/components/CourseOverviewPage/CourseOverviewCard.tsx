
import type { Course } from '../../models/course'
import type { UserInfo } from '../../models/user'
import type { Term } from '../../models/term'

interface CourseOverviewCardProps {
  course?: Course;
  term?: Term;
  students?: Pick<UserInfo, "avatar">[];
}

const CourseOverviewCard = ({
  course,
  term,
  students = []
}: CourseOverviewCardProps) => {
  if (!course) return null;
  const maxVisibleAvatars = 4;
  const visibleAvatars = students.slice(0, maxVisibleAvatars);
  const remainingCount = students.length - maxVisibleAvatars;

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full max-w-sm">
      {/* Header */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">{term?.label || course.courseTerm}</p>
        <h2 className="text-2xl font-bold text-gray-900">{course.courseName}</h2>
      </div>

      {/* Instructor */}
      <p className="text-sm text-gray-700 mb-2">
        Instructor: <span className="font-medium">{course.instructor}</span>
      </p>

      {/* Class Code and Avatars */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-700">
          Class: <span className="font-medium">{course.classCode}</span>
        </p>

        {/* Avatar Group */}
        <div className="flex items-center -space-x-2">
          {visibleAvatars.map((student, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-700"
            >
              <img
                src={student.avatar}
                alt="Student"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-700">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
        <span>Slot {course.totalSlots}</span>
        <span>{course.attendancePercent}% complete</span>
      </div>
    </div>
  );
};

export default CourseOverviewCard;