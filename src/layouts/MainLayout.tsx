import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>

      <main className="flex-1 py-30 container mx-auto font-public">
        <Outlet/>
      </main>

      <Footer/>
    </div>
  )
}

export default MainLayout
