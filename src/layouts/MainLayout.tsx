import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>Header</header>

      <main className="flex-1">
        <Outlet/>
      </main>

      <footer>Footer</footer>
    </div>
  )
}

export default MainLayout
