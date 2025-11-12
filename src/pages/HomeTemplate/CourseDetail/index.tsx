import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/shared/PageTitle';
import type { ColumnConfig } from '../../../components/shared/Table';
import Table from '../../../components/shared/Table';
import type { CourseGroup } from '../../../models/course';

interface StudentData {
    no: number;
    avatar: string;
    name: string;
    id: string;
    email: string;
    note: string;
}


const CourseDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const courseData = location.state?.course as CourseGroup;

    const [students, setStudents] = useState<StudentData[]>([]);

    useEffect(() => {
        // Mock student data - replace with your API call later
        const mockStudents: StudentData[] = Array.from({ length: 11 }, (_, i) => ({
            no: i + 1,
            avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
            name: ['Trần Hồng Ngọc Phương', 'Phan Đức Toản', 'Nguyễn Ngọc Phương Linh',
                'Bùi Phương Khánh Nguyên', 'Võ Thanh Phương Uyên', 'Trần Ngọc Thiên Hưng',
                'Trương Huỳnh Nguyên Hương', 'Hoàng Tấn Khang Anh', 'Nguyễn Linh Châu An',
                'Nguyễn Thùy Ngọc Hằng', 'Võ Như Thanh Thảo'][i],
            id: 'GDS200658',
            email: 'GDS200648@fpt.edu.vn',
            note: ''
        }));
        setStudents(mockStudents);
    }, []);

    // Redirect if no course data
    useEffect(() => {
        if (!courseData) {
            navigate('/course-overview', { replace: true });
        }
    }, [courseData, navigate]);

    if (!courseData) return null;

    const columns: ColumnConfig<StudentData>[] = [
        {
            key: 'no',
            title: 'No',
            width: '60px',
        },
        {
            key: 'name',
            title: 'Member',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{row.name}</span>
                </div>
            ),
        },
        {
            key: 'id',
            title: 'ID',
            width: '120px',
        },
        {
            key: 'email',
            title: 'Email',
            width: '200px',
        },
        {
            key: 'note',
            title: 'Note',
            width: '150px',
        },
    ];

    return (
        <div>
            <div className="max-w-7xl pt-6 ">
                <div className="bg-white mb-6">
                    <PageTitle breadcrumb="Course Detail" />
                    <div className="grid grid-cols-2 gap-y-4 pt-10">
                        <div className="space-y-3 w-[405px]">
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Class</span>
                                <span className="text-blue-600 font-medium">{courseData.code}</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Instructor</span>
                                <span className="text-blue-600 font-medium">{courseData.teacherId}</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Total Slots</span>
                                <span className="text-primary font-medium">{courseData.slot}</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Room</span>
                                <span className="text-blue-600 font-medium">F-304</span>
                            </div>
                        </div>
                        <div className="space-y-3 w-[580px]">
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Programme</span>
                                <span className="text-primary font-medium">UoG</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Course</span>
                                <span className="text-primary font-medium">{courseData.title}</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Booker</span>
                                <span className="text-blue-600 font-medium">daona</span>
                            </div>
                            <div className="flex border-b justify-between">
                                <span className="text-gray-600 font-medium w-32">Booking time</span>
                                <span className="text-primary font-medium">Dec 12, 2024 5:12:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <Table
                        columns={columns}
                        data={students}
                        color="bg-primary"
                        textColor="text-white"
                        bordered={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;