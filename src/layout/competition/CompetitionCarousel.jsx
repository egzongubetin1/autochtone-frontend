"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImagePath } from "@/utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CompetitionItemDetailCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };
  const getDisplayedImages = () => {
    const startIndex = (currentIndex + 1) % images.length;
    const displayedImages = [];
    for (let i = 1; i <= 3; i++) {
      displayedImages.push(images[(startIndex + i) % images.length]);
    }
    return displayedImages;
  };

  return (
    <>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="relative col-span-2 w-full h-[250px] md:h-[400px]">
          <div
            className="cursor-pointer absolute left-[10px] top-[50%] bg-primary w-[40px] h-[40px] flex items-center text-white rounded-md justify-center"
            onClick={handlePrev}
          >
            <ChevronLeft />
          </div>
          <Image
            src={getImagePath(images[currentIndex]?.image)}
            alt="car"
            fill
            className="rounded-md border object-cover"
          />
          <div
            className="cursor-pointer absolute right-[10px] top-[50%] bg-primary w-[40px] h-[40px] flex items-center text-white rounded-md justify-center"
            onClick={handleNext}
          >
            <ChevronRight />
          </div>
        </div>
        <div className="w-full md:col-start-3 h-full rounded-md">
          <div className="flex flex-col gap-5">
            <div className="relative col-span-3 row-span-2 h-[270px]">
              <Image
                src={getImagePath(
                  images[(currentIndex + 1) % images.length]?.image
                )}
                alt="car"
                fill
                className="rounded-md border object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {getDisplayedImages().map((image, index) => (
                <div
                  key={index}
                  className="relative h-[100px] rounded-md cursor-pointer"
                  onClick={() =>
                    setCurrentIndex((currentIndex + index) % images.length)
                  }
                >
                  <Image
                    src={getImagePath(image.image)}
                    alt="car"
                    fill
                    className="rounded-md border object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Carousel className="md:hidden w-full">
          <CarouselContent>
            {images?.map((image, index) => (
              <CarouselItem
                key={index}
                className="relative h-[350px] rounded-md"
              >
                <Image
                  src={getImagePath(image.image)}
                  // src={"/assets/black-car.jpeg"}
                  alt="car"
                  fill
                  className="rounded-md border object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="bg-primary rounded-md hover:bg-primary"
            size={"icon"}
          />
          <CarouselNext
            className="bg-primary rounded-md hover:bg-primary"
            size={"icon"}
          />
        </Carousel>
      </div>
    </>
  );
}
