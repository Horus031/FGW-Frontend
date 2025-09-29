import React from "react"
import { Route, type RouteObject } from "react-router-dom"

// If using relative paths:
const HomePage = React.lazy(() => import("../pages/HomeTemplate/HomePage"));
const LoginPage = React.lazy(() => import("../pages/AuthTemplate/LoginPage"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout"))
const ProfilePage = React.lazy(() => import("../pages/HomeTemplate/ProfilePage"))
const AttendancePage = React.lazy(() => import("../pages/HomeTemplate/AttendancePage"))
const MarkPage = React.lazy(() => import("../pages/HomeTemplate/MarkPage"))
const ClassOverviewPage = React.lazy(() => import("../pages/HomeTemplate/ClassOverviewPage"))

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component/>
    </React.Suspense>
  )
}

export const routes: RouteObject[] = [
    {
        path: "/",
        element: withSuspense(MainLayout),
        children: [
          {
            path: "home",
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
    <Route key={index} path={route.path} element={route.element}/>
  ))
}
