import LandingCarousel from "./landingCarousel"
import CustomSeparator from "@/components/(shared)/common/customSeparator";

export default function LandingPage() {
	return (
		<>
			<section className="h-screen flex flex-row justify-center items-center gap-x-10">
				<div className="w-full flex flex-col justify-center space-y-6 relative">
					<h1 className="font-semibold text-5xl leading-tight">
						Слоган компании, который мы еще не придумали
					</h1>
					<CustomSeparator/>
					<p className="pt-20 text-xl leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend, nulla ut posuere maximus, diam eros
						mattis dui, ac rhoncus urna lorem elementum lorem.
					</p>
				</div>
				<div>
					<LandingCarousel/>
				</div>
			</section>
			<section className="flex flex-col items-center w-full">
				<div className="flex flex-row justify-between w-full mx-auto gap-x-10">
					<CustomSeparator direction="left" className="my-8 flex-1"/>
					<CustomSeparator direction="left" className="my-8 flex-1"/>
				</div>
			</section>


		</>
	);
}
