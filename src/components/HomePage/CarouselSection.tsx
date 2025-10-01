const CarouselSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2x1">
        <img
          src="/images/Homepage/Carousel.png"
          alt="Greenwich University"
          className="w-full h-96 object-cover object-right"
        />
        <div className="absolute"></div>
      </div>
    </div>
  );
};

export default CarouselSection;