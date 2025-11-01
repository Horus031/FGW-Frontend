import React from "react";
import { Route, type RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// If using relative paths:
const CourseOverview = React.lazy(
  () => import("../pages/HomeTemplate/CourseOverview")
);
const HomePage = React.lazy(() => import("../pages/HomeTemplate/HomePage"));
const LoginPage = React.lazy(() => import("../pages/AuthTemplate/LoginPage"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout"));
const ProfilePage = React.lazy(
  () => import("../pages/HomeTemplate/ProfilePage")
);
const AttendancePage = React.lazy(
  () => import("../pages/HomeTemplate/AttendancePage")
);
const MarkPage = React.lazy(() => import("../pages/HomeTemplate/MarkPage"));
const ClassOverviewPage = React.lazy(
  () => import("../pages/HomeTemplate/ClassOverviewPage")
);
const SendRequestPage = React.lazy(
  () => import("../pages/HomeTemplate/SendRequestPage")
);
const RequestStatusPage = React.lazy(
  () => import("../pages/HomeTemplate/RequestStatusPage")
);
const SchedulePage = React.lazy(
  () => import("../pages/HomeTemplate/SchedulePage")
);
const StudentFeedbackPage = React.lazy(
  () => import("../pages/HomeTemplate/StudentFeedbackPage")
);
const RoomBookingPage = React.lazy(
  () => import("../pages/HomeTemplate/RoomBookingPage/RoomBooking")
);
const PendingFeedbackPage = React.lazy(
  () => import("../pages/HomeTemplate/PendingFeedbackPage")
);
const NotFoundPage = React.lazy(
  () => import("../pages/HomeTemplate/NotFoundPage")
);

// Authentication Bridge
const AuthBridge = React.lazy(() => import("../router/AuthBridge"));

// Admin Route
const AdminLayout = React.lazy(() => import("../layouts/AdminLayout"));

// Teacher Routes
const ActivitiesPage = React.lazy(
  () => import("../pages/HomeTemplate/ActivitiesPage")
);
const GradePage = React.lazy(() => import("../pages/HomeTemplate/GradePage"));
const TimetablePage = React.lazy(
  () => import("../pages/HomeTemplate/TimetablePage")
);
const CheckAttendancePage = React.lazy(
  () => import("../pages/HomeTemplate/CheckAttendancePage")
);
const TeachingSummaryPage = React.lazy(
  () => import("../pages/HomeTemplate/TeachingSummaryPage")
);

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "attendance", element: <AttendancePage /> },
          { path: "mark", element: <MarkPage /> },
          { path: "class", element: <ClassOverviewPage /> },
          {
            path: "request/:requestType",
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [{ path: "", element: <SendRequestPage /> }],
          },
          {
            path: "req-status",
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [{ path: "", element: <RequestStatusPage /> }],
          },
          { path: "schedule", element: <SchedulePage /> },
          { path: "feedback", element: <StudentFeedbackPage /> },
          { path: "booking", element: <RoomBookingPage /> },
          { path: "course-overview", element: <CourseOverview /> },
          {
            path: "pending-feedback",
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [{ path: "", element: <PendingFeedbackPage /> }],
          },
          { path: "not-found", element: <NotFoundPage /> },

          // Staff routes
          {
            path: "activities",
            element: <ProtectedRoute allowedRoles={["Staff"]} />,
            children: [{ path: "", element: <ActivitiesPage /> }],
          },
          {
            path: "grade",
            element: <ProtectedRoute allowedRoles={["Staff"]} />,
            children: [{ path: "", element: <GradePage /> }],
          },
          {
            path: "timetable",
            element: <ProtectedRoute allowedRoles={["Staff"]} />,
            children: [{ path: "", element: <TimetablePage /> }],
          },
          {
            path: "check-attendance",
            element: <ProtectedRoute allowedRoles={["Staff"]} />,
            children: [{ path: "", element: <CheckAttendancePage /> }],
          },
          {
            path: "summary",
            element: <ProtectedRoute allowedRoles={["Staff"]} />,
            children: [{ path: "", element: <TeachingSummaryPage /> }],
          },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "", element: <AdminLayout /> }],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/auth/bridge", element: <AuthBridge /> },
];

export const generateRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ));
};
