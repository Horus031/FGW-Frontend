import React from "react"
import { Route, type RouteObject } from "react-router-dom"

// If using relative paths:
const HomePage = React.lazy(() => import("../pages/HomeTemplate/HomePage"));
const AuthTemplate = React.lazy(() => import("../pages/AuthTemplate"));
const LoginPage = React.lazy(() => import("../pages/AuthTemplate/LoginPage"));

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component/>
    </React.Suspense>
  )
}

export const routes: RouteObject[] = [
    {
        path: "",
        element: withSuspense(HomePage),
    },
    {
        path: "/auth",
        element: withSuspense(AuthTemplate),
        children: [
            {
                path: "Login",
                element: withSuspense(LoginPage)
            },
        ]
    }
]

export const generateRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}/>
  ))
}
