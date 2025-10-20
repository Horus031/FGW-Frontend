import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";


const CarouselSection = () => {
  return (
    <div className="mx-auto">
      <Carousel
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <img src="/images/Homepage/Carousel.png" alt="" className="w-full lg:h-fit 2xl:h-80"/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-16 cursor-pointer" />
        <CarouselNext className="-translate-x-16 cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CarouselSection;
