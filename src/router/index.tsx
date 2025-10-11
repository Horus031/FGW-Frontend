import React from "react"
import { Route, type RouteObject } from "react-router-dom"
import LoadingPage from "../components/shared/LoadingPage";


// If using relative paths:
const HomePage = React.lazy(() => import("../pages/HomeTemplate/HomePage"))
const LoginPage = React.lazy(() => import("../pages/AuthTemplate/LoginPage"))
const MainLayout = React.lazy(() => import("../layouts/MainLayout"))
const ProfilePage = React.lazy(() => import("../pages/HomeTemplate/ProfilePage"))
const AttendancePage = React.lazy(() => import("../pages/HomeTemplate/AttendancePage"))
const MarkPage = React.lazy(() => import("../pages/HomeTemplate/MarkPage"))
const ClassOverviewPage = React.lazy(() => import("../pages/HomeTemplate/ClassOverviewPage"))
const SendRequestPage = React.lazy(() => import("../pages/HomeTemplate/SendRequestPage"))
const RequestStatusPage = React.lazy(() => import("../pages/HomeTemplate/RequestStatusPage"))
const SchedulePage = React.lazy(() => import("../pages/HomeTemplate/SchedulePage"))
const StudentFeedbackPage = React.lazy(() => import("../pages/HomeTemplate/StudentFeedbackPage"))
const RoomBookingPage = React.lazy(() => import("../pages/HomeTemplate/RoomBookingPage/RoomBooking"))

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Component />
    </React.Suspense>
  )
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(MainLayout),
    children: [
      {
        path: "",
        element: withSuspense(HomePage)
      },
      {
        path: "profile",
        element: withSuspense(ProfilePage)
      },
      {
        path: "attendance",
        element: withSuspense(AttendancePage)
      },
      {
        path: "mark",
        element: withSuspense(MarkPage)
      },
      {
        path: "class",
        element: withSuspense(ClassOverviewPage)
      },
      {
        path: "request/:requestType",
        element: withSuspense(SendRequestPage)
      },
      {
        path: "req-status",
        element: withSuspense(RequestStatusPage)
      },
      {
        path: "schedule",
        element: withSuspense(SchedulePage)
      },
      {
        path: "feedback",
        element: withSuspense(StudentFeedbackPage)
      },
      {
        path: "booking",
        element: withSuspense(RoomBookingPage)
      }
    ]
  },
  {
    path: "/login",
    element: withSuspense(LoginPage),
  }
]

export const generateRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ))
}
