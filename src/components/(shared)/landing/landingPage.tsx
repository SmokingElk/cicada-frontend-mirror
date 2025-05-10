"use client";

import LandingCarousel from "@/components/(shared)/landing/landingCarousel";
import LineSeparator from "@/components/(shared)/common/lineSeparator";
import LandingCard from "@/components/(shared)/landing/landingCard";
import Wrapper from "@/components/(shared)/common/wrapper";
import Image from "next/image";
import featureHintsLight from "@/../public/images/lightTheme/featureHintsLight.svg";
import featureHintsDark from "@/../public/images/darkTheme/featureHintsDark.svg";
import featureDynamicsLight from "@/../public/images/lightTheme/featureDynamicsLight.svg";
import featureDynamicsDark from "@/../public/images/darkTheme/featureDynamicsDark.svg";
import featureBestMovesLight from "@/../public/images/lightTheme/featureBestMovesLight.svg";
import featureBestMovesDark from "@/../public/images/darkTheme/featureBestMovesDark.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PointSeparator from "@/components/(shared)/common/pointSeparator";
import { ReactNode } from "react";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme } = useTheme();
  const featureHints = theme === "dark" ? featureHintsDark : featureHintsLight;
  const featureDynamics =
    theme === "dark" ? featureDynamicsDark : featureDynamicsLight;
  const featureBestMoves =
    theme === "dark" ? featureBestMovesDark : featureBestMovesLight;
  const features = [
    {
      description: "Играть онлайн с последующим полным анализом партии",
      image: featureHints,
    },
    {
      description:
        "Получать оценку своей игры и стратегии соперника по итогам матча",
      image: featureDynamics,
    },
    {
      description:
        "Автоматически формировать нарезки лучших моментов для публикации",
      image: featureBestMoves,
    },
  ];


  return (
    <>
      <section className="h-auto md:min-h-[var(--app-height)] flex items-center mb-5 mt-3">
        <Wrapper className="flex flex-col md:flex-row justify-between items-center gap-x-10">
          <div className="w-full md:w-1/2 h-screen md:h-auto flex flex-col justify-center space-y-6">
            <h1 className="font-semibold text-3xl md:text-5xl leading-tight">
              Играй. Учись. Побеждай.
            </h1>
            <LineSeparator/>
            <div className="text-xl leading-relaxed pt-20">
              Онлайн-платформа для тех, кто хочет расти в шахматах: быстрые партии с живыми соперниками,
              пошаговые уроки от мастеров, разборы партий и рейтинговые турниры 24/7. Присоединяйтесь
              — прокачайте мышление и почувствуйте вкус побед уже сегодня.
            </div>
            <Button className="w-1/2" variant="transparrent" size="xl" asChild>
              <Link href="/lobby">Играть</Link>
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <LandingCarousel/>
          </div>
        </Wrapper>
      </section>
      <section className="flex flex-col items-center w-full bg-muted">
        <Wrapper className={"mt-14"}>
          <div className="hidden md:flex flex-row justify-between gap-x-10 w-full">
            <LineSeparator direction="left" className="flex-1"/>
            <LineSeparator direction="left" className="flex-1" />
          </div>
          <div
              className="flex flex-col md:flex-row md:flex-wrap justify-between items-start gap-y-8 mt-14 mb-28 mx-3 md:mx-20">
            <LandingCard
                title="Возможность анализа партий"
                description="Наши алгоритмы готовятся выделить самые яркие моменты"
                className="w-full md:w-[45%]"
            />
            <div className="md:hidden gap-x-10 w-full">
              <LineSeparator direction="left" className="flex-1"/>
            </div>
            <LandingCard
                title="Игроки в ожидании старта"
                description="Наша платформа поможет им разрабатывать собственные стратегии"
                className="w-full md:w-[45%]"
            />
            <div className="md:hidden gap-x-10 w-full">
              <LineSeparator direction="left" className="flex-1"/>
            </div>
            <LandingCard
                title="Бот-помощник"
                description="Готовится к запуску - противник не устоит"
                className="w-full md:w-[45%]"
            />
          </div>
        </Wrapper>
      </section>
      <section className="flex items-center mb-28">
        <Wrapper className="w-full">
          <div className="mt-24 flex flex-col items-center w-full">
            <div
                className={`md:hidden grid-col grid-cols-[1fr_20px_1fr_20px_1fr] gap-y-8 justify-between w-full items-start justify-items-center`}
            >
              {features.reduce((acc, {description, image}, index) => {
                acc.push(
                    <div key={index * 2} className="w-2/3 text-xl text-center">
                      {description}
                    </div>
                );
                acc.push(
                    <div
                        key={`feature_image_${index}`}
                        className={`w-full h-[400px] relative`}
                    >
                      <Image
                          src={image}
                          alt="grid"
                          layout="fill"
                          objectFit="contain"
                      />
                    </div>
                );

                if (index != features.length - 1) {
                  acc.push(
                      <PointSeparator
                          key={index * 2 + 1}
                          width={"full"}
                          height={20}
                      />
                  );
                }

                return acc;
              }, [] as ReactNode[])}
            </div>
            <div
                className={`hidden md:grid grid-cols-[1fr_20px_1fr_20px_1fr] gap-y-8 justify-between w-full items-start justify-items-center`}
            >
              {features.reduce((acc, {description}, index) => {
                acc.push(
                    <div key={index * 2} className="w-2/3 text-xl text-center">
                      {description}
                    </div>
                );

                if (index != features.length - 1) {
                  acc.push(
                      <PointSeparator
                          key={index * 2 + 1}
                          width={"full"}
                          height={20}
                      />
                  );
                }

                return acc;
              }, [] as ReactNode[])}

              {features.reduce((acc, {image}, index) => {
                acc.push(
                    <div
                        key={`feature_image_${index}`}
                        className={`w-full h-[400px] relative`}
                    >
                      <Image
                          src={image}
                          alt="grid"
                          layout="fill"
                          objectFit="contain"
                      />
                    </div>
                );

                if (index != features.length - 1)
                  acc.push(<div key={`feature_image_sep_${index}`}></div>);

                return acc;
              }, [] as ReactNode[])}
            </div>
          </div>
        </Wrapper>
      </section>
    </>
  );
}
