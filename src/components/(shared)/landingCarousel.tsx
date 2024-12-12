"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselApi,
} from "@/components/ui/carousel";

export default function LandingCarousel() {
	const plugin = React.useRef(
		Autoplay({delay: 2000, stopOnInteraction: true})
	);

	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

	React.useEffect(() => {
		if (!carouselApi) return;

		setSelectedIndex(carouselApi.selectedScrollSnap());

		carouselApi.on("select", () => {
			setSelectedIndex(carouselApi.selectedScrollSnap());
		});
	}, [carouselApi]);

	return (
		<div className="w-full">
			{/* Карусель */}
			<Carousel
				plugins={[plugin.current]}
				className="w-full max-w-md mx-auto"
				setApi={setCarouselApi}
			>
				<CarouselContent>
					{Array.from({length: 5}).map((_, index) => (
						<CarouselItem key={index}>
							<div className="p-1">
								<Card>
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-4xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Индикаторы */}
			<div className="flex justify-center space-x-2 mt-4">
				{Array.from({length: 5}).map((_, index) => (
					<button
						key={index}
						className={`h-5 w-5 rounded-full ${
							index === selectedIndex ? "bg-[#8A5D31]" : "bg-[#232326]"
						}`}
						onClick={() => carouselApi?.scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
