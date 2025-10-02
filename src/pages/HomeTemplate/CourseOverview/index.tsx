import CourseOverviewCard from '../../../components/CourseOverviewPage/CourseOverviewCard';
import type { Course } from '../../../models/course';
import type { UserInfo } from '../../../models/user';

const App = () => {
  const sampleStudents: Pick<UserInfo, "avatar">[] = [
    { avatar: 'https://via.placeholder.com/32?text=TN' },
    { avatar: 'https://via.placeholder.com/32?text=HD' },
    { avatar: 'https://via.placeholder.com/32?text=NL' },
    { avatar: 'https://via.placeholder.com/32?text=TH' },
    { avatar: 'https://via.placeholder.com/32?text=PV' },
    { avatar: 'https://via.placeholder.com/32?text=LT' },
    { avatar: 'https://via.placeholder.com/32?text=HM' },
    { avatar: 'https://via.placeholder.com/32?text=NK' }
  ];

  const sampleCourses: Course[] = [
    {
      courseTerm: "Summer 2024",
      courseName: "Design Research Project",
      classCode: "TDS1502",
      totalSlots: 40,
      attendancePercent: 75,
      instructor: "SonND24",
      students: sampleStudents
    },
    {
      courseTerm: "Summer 2024",
      courseName: "Advanced Programming",
      classCode: "PRG1001",
      totalSlots: 35,
      attendancePercent: 85,
      instructor: "NguyenVH",
      students: sampleStudents.slice(0, 6)
    },
    {
      courseTerm: "Summer 2024",
      courseName: "Database Systems",
      classCode: "DBS2001",
      totalSlots: 45,
      attendancePercent: 90,
      instructor: "TranTM",
      students: sampleStudents.slice(0, 5)
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sampleCourses.map((course, index) => (
          <CourseOverviewCard
            key={course.classCode}
            course={course}
            students={course.students}
          />
        ))}
      </div>
    </div>
  );
};

export default App;