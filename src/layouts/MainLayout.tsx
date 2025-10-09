// import Footer from "@/components/shared/Footer"
// import Header from "@/components/shared/Header"
import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>

      <main className="flex-1 py-30 md:container md:mx-auto px-8 font-public">
        <Outlet/>
      </main>

      <Footer/>
    </div>
  )
}

export default MainLayout
