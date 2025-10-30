import { useState, useEffect } from 'react';
import CourseOverviewCard from '../../../components/CourseOverviewPage/CourseOverviewCard';
import type { Course } from '../../../models/course';
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import FilterButton from '../../../components/shared/Filter';
import Pagination from '../../../components/shared/Pagination';
import { getAllCourseForStudent } from '../../../api/requests/course.api';

// Define the filter type for this component
interface CourseFilters {
  departmentid?: number;
  code?: string;
  teacherid?: string;
  level?: string;
  [key: string]: string | number | undefined;
}

const CourseOverview = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({});

  const itemsPerPage = 6;

  // Define filter options
  // const filterOptions = [
  //   {
  //     label: 'Department',
  //     value: 'departmentid',
  //     type: 'number' as const,
  //     placeholder: 'Enter department ID...'
  //   },
  //   {
  //     label: 'Class Code',
  //     value: 'code',
  //     type: 'text' as const,
  //     placeholder: 'Enter class code...'
  //   },
  //   {
  //     label: 'Teacher ID',
  //     value: 'teacherid',
  //     type: 'text' as const,
  //     placeholder: 'Enter teacher ID...'
  //   },
  //   {
  //     label: 'Level',
  //     value: 'level',
  //     type: 'select' as const,
  //     options: [
  //       { label: 'Beginner', value: 'beginner' },
  //       { label: 'Intermediate', value: 'intermediate' },
  //       { label: 'Advanced', value: 'advanced' }
  //     ],
  //     placeholder: 'Select level...'
  //   }
  // ];

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllCourseForStudent(currentPage, itemsPerPage);

        if (!Array.isArray(response)) {
          setCourses([]);
          return;
        }

        // Sample student avatars
        const sampleStudents = [
          { avatar: 'https://i.pravatar.cc/150?img=1' },
          { avatar: 'https://i.pravatar.cc/150?img=2' },
          { avatar: 'https://i.pravatar.cc/150?img=3' },
          { avatar: 'https://i.pravatar.cc/150?img=4' },
          { avatar: 'https://i.pravatar.cc/150?img=5' },
        ];

        // 🔁 Transform API response to match CourseOverviewCard props
        const transformedCourses: Course[] = response.map((item) => ({
          courseTerm: "Fall 2025",              // static or map from item if available
          courseName: item.title || "Untitled", // from API
          classCode: item.code || "N/A",
          totalSlots: item.slot || 0,
          attendancePercent: Math.floor(Math.random() * 40) + 60, // mock 60–100%
          instructor: `${item.teacherId}`,
          students: sampleStudents.slice(0, Math.min(5, item.slot / 10)),
        }));

        setCourses(transformedCourses);

      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, searchQuery, filters]);
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: CourseFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

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
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* Filter button */}
        <div className="ml-4">
          <FilterButton<CourseFilters>
            // filters={filterOptions}
            onFilterChange={handleFilterChange}
          />

        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading courses...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Course cards */}
      {!loading && !error && (
        <>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <CourseOverviewCard
                  key={`${course.classCode}-${index}`}
                  course={course}
                  students={course.students}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found.</p>
            </div>
          )}

          {/* ✅ Always show pagination, even when empty */}
          <div className="pt-10">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseOverview;