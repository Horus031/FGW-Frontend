import WelcomeSection from "../../../components/HomePage/WelcomeSection";
import CarouselSection from "../../../components/HomePage/CarouselSection";
import NewsSection from "../../../components/HomePage/NewsSection";
import HomeNavigation from "../../../components/HomePage/HomeNavigation";

const HomePage = () => {
  return (
    <div className="space-y-8 font-public">
      <WelcomeSection />

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Full Width Carousel */}
          <CarouselSection />

          <NewsSection />
        </div>

        {/* Two Column Grid Below */}
        <div className="">
          <div className="md:gap-8 lg:gap-31.5">
            <div className="space-y-8">
              <HomeNavigation/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
