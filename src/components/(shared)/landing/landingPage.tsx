import LandingCarousel from "./landingCarousel"
import ThemeToggle from "@/providers/items/themeToggle";

export default function LandingPage() {
	return (
		<section className="h-screen flex flex-row justify-center items-center gap-x-10">
			<div className="w-1/2 flex flex-col justify-center space-y-6 relative">
				<h1 className="font-semibold text-4xl leading-tight">
					Слоган компании, который мы еще не придумали
				</h1>
				<div>
					<div className="relative w-full">
						<div className="w-[50%] border-t border-gray-800"></div>
						<div className="absolute right-[50%] top-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-gray-800"></div>
					</div>
				</div>
				<p className="pt-20 text-xl leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend, nulla ut posuere maximus, diam eros
					mattis dui, ac rhoncus urna lorem elementum lorem.
				</p>
			</div>
			<div>
				<LandingCarousel />
			</div>
		</section>
	);
}
