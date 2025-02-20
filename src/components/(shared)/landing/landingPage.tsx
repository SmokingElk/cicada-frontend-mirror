"use client";

import LandingCarousel from "./landingCarousel";
import LineSeparator from "@/components/(shared)/common/lineSeparator";
import LandingCard from "@/components/(shared)/landing/landingCard";
import Wrapper from "@/components/(shared)/common/wrapper";
import Image from "next/image";
import featureHintsLight from "../../../../public/images/lightTheme/featureHintsLight.svg";
import featureHintsDark from "../../../../public/images/darkTheme/featureHintsDark.svg";
import featureDynamicsLight from "../../../../public/images/lightTheme/featureDynamicsLight.svg";
import featureDynamicsDark from "../../../../public/images/darkTheme/featureDynamicsDark.svg";
import featureBestMovesLight from "../../../../public/images/lightTheme/featureBestMovesLight.svg";
import featureBestMovesDark from "../../../../public/images/darkTheme/featureBestMovesDark.svg";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import PointSeparator from "../common/pointSeparator";
import {ReactNode} from "react";
import {useTheme} from "next-themes";

export default function LandingPage() {
    const {theme} = useTheme();
    const featureHints = theme === "dark" ? featureHintsDark : featureHintsLight;
    const featureDynamics = theme === "dark" ? featureDynamicsDark : featureDynamicsLight;
    const featureBestMoves = theme === "dark" ? featureBestMovesDark : featureBestMovesLight;
    const features = [
        {
            description: "Получать подсказки о хороших ходах в реальном времени",
            image: featureHints,
        },
        {
            description:
                "Анализировать уровень вашей игры и игры противника на протяжении всей партии",
            image: featureDynamics,
        },
        {
            description:
                "Автоматически определять лучшие моменты для публикации их в ленте",
            image: featureBestMoves,
        },
    ];

    return (
        <>
            <section className="h-screen flex items-center">
                <Wrapper className="flex flex-row justify-between items-center gap-x-10">
                    <div className="w-1/2 flex flex-col justify-center space-y-6">
                        <h1 className="font-semibold text-5xl leading-tight">
                            Слоган компании, который мы еще не придумали
                        </h1>
                        <LineSeparator/>
                        <div className="text-xl leading-relaxed pt-20">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                            eleifend, nulla ut posuere maximus, diam eros mattis dui, ac
                            rhoncus urna lorem elementum lorem. Duis auctor ipsum vitae
                            fermentum porttitor. Praesent semper eu dui at vulputate. Integer
                            vel sodales justo, sit amet rhoncus augue.
                        </div>
                        <Button className="w-1/2" variant="transparrent" size="xl" asChild>
                            <Link href="/">Играть</Link>
                        </Button>
                    </div>
                    <div className="w-1/2">
                        <LandingCarousel/>
                    </div>
                </Wrapper>
            </section>
            <section className="flex flex-col items-center w-full bg-muted">
                <Wrapper className={"mt-14"}>
                    <div className="flex flex-row justify-between gap-x-10 w-full">
                        <LineSeparator direction="left" className="flex-1"/>
                        <LineSeparator direction="left" className="flex-1"/>
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
            <section className="flex items-center mb-28">
                <Wrapper className="w-full">
                    <div className="mt-24 flex flex-col items-center w-full">
                        <div
                            className={`grid grid-cols-[1fr_20px_1fr_20px_1fr] gap-y-8 justify-between w-full items-start justify-items-center`}
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
