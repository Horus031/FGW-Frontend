export type User = {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export type UserInfo = {
    fullName: string;
    avatar: string;
    studentId: string;
    email: string;
    faculty: string;
    major: string;
    year: string;
    academicYear: string;
    campus: string;
    courses: string[];
}