import LandingCarousel from "./landingCarousel"
import CustomSeparator from "@/components/(shared)/common/customSeparator";
import LandingCard from "@/components/(shared)/landing/landingCard";
import Wrapper from "@/components/(shared)/common/wrapper";
import Image from "next/image";
import landingChessGrid from "@/../public/images/landingChessGrid.png"
import landingGraphic from "@/../public/images/landingGraphic.png"
import landingChessGrid2 from "@/../public/images/landingChessGrid2.png"

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
						<CustomSeparator direction="left" className="flex-1"/>
						<CustomSeparator direction="left" className="flex-1"/>
					</div>
					<div className="flex flex-wrap justify-between items-start gap-y-8 mt-14 mb-28 mx-20">
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
			<section className="flex items-center">
				<Wrapper className="w-full">
					<div className="mt-24 flex flex-col items-center w-full">
						<div className="flex justify-between w-full items-start">
							<div className="w-1/3 text-xl text-center">
								Получать подсказки о хороших ходах в реальном времени
							</div>

							<div className="flex items-center justify-center w-1/6">
								<div className="w-4 h-4 rotate-45 bg-gray-800 my-8"></div>
							</div>

							<div className="w-1/3 text-xl text-center">
								Анализировать уровень вашей игры и игры противника на протяжении всей партии
							</div>

							<div className="flex items-center justify-center w-1/6">
								<div className="w-4 h-4 rotate-45 bg-gray-800 my-8"></div>
							</div>

							<div className="w-1/3 text-xl text-center">
								Автоматически определять лучшие моменты для публикации их в ленте
							</div>
						</div>

						<div className="flex justify-between w-full mt-8">
							<div className="w-1/3 h-[400px] flex items-center justify-center">
								<div className="w-full h-full relative">
									<Image
										src={landingChessGrid}
										alt="grid"
										layout="fill"
										objectFit="contain"
									/>
								</div>
							</div>

							<div className="w-1/3 h-[400px] flex items-center justify-center">
								<div className="w-full h-full relative">
									<Image
										src={landingGraphic}
										alt="graphic"
										layout="fill"
										objectFit="contain"
									/>
								</div>
							</div>

							<div className="w-1/3 h-[400px] flex items-center justify-center">
								<div className="w-full h-full relative">
									<Image
										src={landingChessGrid2}
										alt="grid2"
										layout="fill"
										objectFit="contain"
									/>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			</section>
		</>
	);
}
