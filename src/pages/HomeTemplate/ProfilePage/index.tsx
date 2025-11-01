// import ProgressCircle from "@/components/ProgressCircle";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/shared/PageTitle";
import ProfileCard from "../../../components/ProfilePage/ProfileCard";
import { useEffect, useState } from "react";
import type { Course } from "../../../models/course";
import LoadingPage from "../../../components/shared/LoadingPage";
import CourseOverviewCard from "../../../components/CourseOverviewPage/CourseOverviewCard";
import { getAllCourseForStudent } from "../../../api/requests/course.api";

const ProfilePage = () => {

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage] = useState(1);
  const itemsPerPage = 3;

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
  }, [currentPage]);
  // Handle search input


  return (
    <div className="space-y-8">
      <PageTitle breadcrumb="Profile" />

      <ProfileCard />
      <div className="max-w-7xl">

        {/* Loading state */}
        {loading && <LoadingPage />}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div className="flex justify-between items-center w-full pb-6">
          <h2 className="text-lg font-semibold">My Courses</h2>
          <Link
            to="/course-overview"
            className=" text-secondary px-4 py-2 font-medium hover:opacity-70"
          >
            View All
          </Link>

        </div>



        {/* Course cards */}
        {!loading && !error && (
          <>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          </>
        )}
      </div>
    </div>
    // <div className="grid grid-cols-3 gap-5">
    //   <CourseCard />
    //   <CourseCard />
    //   <CourseCard />
    // </div>
  );
};

export default ProfilePage;
