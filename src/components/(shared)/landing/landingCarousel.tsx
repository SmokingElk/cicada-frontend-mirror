"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

import slide1 from "@/../public/landing-carousel/1.jpg";
import slide2 from "@/../public/landing-carousel/2.jpg";
import slide3 from "@/../public/landing-carousel/3.jpg";
import slide4 from "@/../public/landing-carousel/4.jpg";

const slides = [slide1, slide2, slide3, slide4];

interface CarouselIndicatorProps {
  selected: boolean;
  scrollToMe: () => void;
}

function CarouselIndicator({ selected, scrollToMe }: CarouselIndicatorProps) {
  return (
    <button
      className={`h-4 w-4 rounded-full transition-colors ${
        selected ? "bg-primary" : "bg-foreground/40"
      }`}
      onClick={scrollToMe}
    />
  );
}

export default function LandingCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, playOnInit: true })
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () =>
      setSelectedIndex(carouselApi.selectedScrollSnap())
    );
  }, [carouselApi]);

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-md mx-auto"
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {slides.map((img, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="relative aspect-square overflow-hidden rounded">
                    <Image
                      src={img}
                      alt={`slide-${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 90vw, 400px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center space-x-3 mt-4">
        {slides.map((_, index) => (
          <CarouselIndicator
            key={index}
            selected={index === selectedIndex}
            scrollToMe={() => carouselApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
