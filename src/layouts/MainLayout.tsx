// import Footer from "@/components/shared/Footer"
// import Header from "@/components/shared/Header"
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full py-30 px-20 mx-auto max-w-[calc(100%-160px)] md:max-w-screen-2xl font-public">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
