
import WelcomeSection from '../../../components/HomePage/WelcomeSection';
import CarouselSection from '../../../components/HomePage/CarouselSection';
import NewsSection from '../../../components/HomePage/NewsSection';
import ActionButtons from '../../../components/HomePage/ActionButtons';
import RegistrationAndFeedback from '../../../components/HomePage/RegistrationAndFeedback';



const HomePage = () => {
  return (
    <div className="">
      {/* Main Content */}
      <div className="space-y-8">
        {/* Welcome Text */}
        <WelcomeSection />

        {/* Full Width Carousel */}
        <CarouselSection />

        {/* Two Column Grid Below */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <NewsSection />

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
}

export default HomePage
