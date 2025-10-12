import CourseOverviewCard from '../../../components/CourseOverviewPage/CourseOverviewCard';
import type { Course } from '../../../models/course';
import type { UserInfo } from '../../../models/user';
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import FilterButton from '../../../components/shared/Filter';
import  Pagination  from '../../../components/shared/Pagination';

const CourseOverview = () => {
  const sampleStudents: Pick<UserInfo, "avatar">[] = [
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' },
    { avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F775956210820654804%2F&psig=AOvVaw05aF1aUbjVfWl55D5TTTh4&ust=1760344085806000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIChkvqenpADFQAAAAAdAAAAABAj' }
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
    },
    {
      courseTerm: "Summer 2024",
      courseName: "Database Systems",
      classCode: "DBS2001",
      totalSlots: 45,
      attendancePercent: 90,
      instructor: "TranTM",
      students: sampleStudents.slice(0, 5)
    },
    {
      courseTerm: "Summer 2024",
      courseName: "Database Systems",
      classCode: "DBS2001",
      totalSlots: 45,
      attendancePercent: 90,
      instructor: "TranTM",
      students: sampleStudents.slice(0, 5)
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
    <div className="max-w-7xl mx-auto pt-6">
      <div className="flex items-center mb-6">
        {/* Search bar */}
        <div className="relative w-full max-w-sm">
          <Search
            className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
            size={24}
          />
          <Input
            placeholder="Search..."
            className="pl-10 font-medium"
          />
        </div>
        {/* Filter button */}
        <div className="ml-4">
          <FilterButton />
        </div>
      </div>
      {/* Course cards*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCourses.map((course, _index) => (
          <CourseOverviewCard
            key={course.classCode}
            course={course}
            students={course.students}
          />
        ))}
      </div>
      <div className='pt-10'>
        <Pagination />
      </div>
    </div>
  );
};

export default CourseOverview;