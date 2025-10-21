import React from "react";
import { Route, type RouteObject } from "react-router-dom";
import LoadingPage from "../components/shared/LoadingPage";
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

const NotFoundPage = React.lazy(
  () => import("../pages/HomeTemplate/NotFoundPage")
);

// Authentication Bridge
const AuthBridge = React.lazy(() => import("../router/AuthBridge"));

// Admin Route
const AdminLayout = React.lazy(() => import("../layouts/AdminLayout"));

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Component />
    </React.Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: withSuspense(MainLayout),
        children: [
          {
            path: "",
            element: withSuspense(HomePage),
          },
          {
            path: "profile",
            element: withSuspense(ProfilePage),
          },
          {
            path: "attendance",
            element: withSuspense(AttendancePage),
          },
          {
            path: "mark",
            element: withSuspense(MarkPage),
          },
          {
            path: "class",
            element: withSuspense(ClassOverviewPage),
          },
          {
            path: "request/:requestType",
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [{ path: "", element: withSuspense(SendRequestPage) }],
          },
          {
            path: "req-status",
            element: <ProtectedRoute allowedRoles={["Student"]} />,
            children: [{ path: "", element: withSuspense(RequestStatusPage) }],
          },
          {
            path: "schedule",
            element: withSuspense(SchedulePage),
          },
          {
            path: "feedback",
            element: withSuspense(StudentFeedbackPage),
          },
          {
            path: "booking",
            element: withSuspense(RoomBookingPage),
          },
          {
            path: "course-overview",
            element: withSuspense(CourseOverview),
          },
          {
            path: "not-found",
            element: withSuspense(NotFoundPage),
          },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "",
            element: withSuspense(AdminLayout),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(LoginPage),
  },
  {
    // Query parameter for path
    path: "/auth/bridge",
    element: withSuspense(AuthBridge),
  },
];

export const generateRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ));
};
