import LandingCarousel from "./landingCarousel"
import CustomSeparator from "@/components/(shared)/common/customSeparator";
import LandingCard from "@/components/(shared)/landing/landingCard";
import Wrapper from "@/components/(shared)/common/wrapper";

export default function LandingPage() {
	return (
		<>
			<section className="h-screen flex items-center">
				<Wrapper className="flex flex-row justify-between items-center gap-x-10">
					<div className="w-1/2 flex flex-col justify-center space-y-6">
						<h1 className="font-semibold text-5xl leading-tight">
							Слоган компании, который мы еще не придумали
						</h1>
						<CustomSeparator/>
						<div className="text-xl leading-relaxed pt-20">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend, nulla ut posuere maximus, diam
							eros mattis dui, ac rhoncus urna lorem elementum lorem. Duis auctor ipsum vitae fermentum porttitor.
							Praesent semper eu dui at vulputate. Integer vel sodales justo, sit amet rhoncus augue.
						</div>
					</div>
					<div className="w-1/2">
						<LandingCarousel/>
					</div>
				</Wrapper>
			</section>
			<section className="flex flex-col items-center w-full bg-[#cfccc9]">
				<Wrapper className={"mt-14"}>
					<div className="flex flex-row justify-between gap-x-10 w-full">
						<CustomSeparator direction="left" className="my-8 flex-1"/>
						<CustomSeparator direction="left" className="my-8 flex-1"/>
					</div>
					<div className="flex flex-wrap justify-between items-start gap-y-8 mt-14 mb-28">
						<LandingCard
							title="1500+ партий"
							description="Проанализировано нашими алгоритмами с целью выявления интересных моментов"
							className="w-[45%]"
						/>
						<LandingCard
							title="10000+ игроков"
							description="Пользуются нашим сервисом для разработки собственных стратегий игры"
							className="w-[45%]"
						/>
						<LandingCard
							title="Более 50"
							description="Новых нарезок с лучшими моментами из партии публикуется ежедневно"
							className="w-[45%]"
						/>
					</div>
				</Wrapper>
			</section>
		</>
	);
}
