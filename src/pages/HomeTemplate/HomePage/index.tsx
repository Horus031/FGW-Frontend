import WelcomeSection from "../../../components/HomePage/WelcomeSection";
import CarouselSection from "../../../components/HomePage/CarouselSection";
import NewsSection from "../../../components/HomePage/NewsSection";
import ActionButtons from "../../../components/HomePage/ActionButtons";
import RegistrationAndFeedback from "../../../components/HomePage/RegistrationAndFeedback";

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
            {/* Left Column */}

            {/* Right Column */}
            <div className="space-y-8">
              {/* Action Buttons Section */}
              <ActionButtons />

              {/* Registration and Feedback Section */}
              <RegistrationAndFeedback />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
