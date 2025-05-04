"use client";

import {useEffect, useRef, useState} from "react";
import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

const barWidthPx = 18;
const barSpacingPx = 8;
const offsetPercent = 10;
const chartPaddingPx = 5;

function Bar({fill, bottomWhite}: { fill: number; bottomWhite: boolean }) {
    const bottomHeight = Math.round(
        offsetPercent + (100 - 2 * offsetPercent) * fill
    );

    return (
        <>
            <div className="hidden h-full md:flex flex-col" style={{width: `${barWidthPx}px`}}>
                <div
                    className={cn(
                        "w-full relative border-b-2 border-background",
                        !bottomWhite ? "bg-primary" : "bg-foreground"
                    )}
                    style={{height: `${100 - bottomHeight}%`}}
                >
                    <div className="absolute top-full w-full h-[2px] flex justify-center items-center">
                        <RhombusDecor className="w-2 h-2 size-1.5 md:size-2 bg-background"/>
                    </div>
                </div>
                <div
                    className={cn("w-full", bottomWhite ? "bg-primary" : "bg-foreground")}
                    style={{height: `${bottomHeight}%`}}
                ></div>
            </div>
            <div className="h-full flex md:hidden flex-col" style={{width: `${barWidthPx/1.5}px`}}>
                <div
                    className={cn(
                        "w-full relative border-b-2 border-background",
                        !bottomWhite ? "bg-primary" : "bg-foreground"
                    )}
                    style={{height: `${100 - bottomHeight}%`}}
                >
                    <div className="absolute top-full w-full h-[2px] flex justify-center items-center">
                        <RhombusDecor className="w-2 h-2 size-1.5 md:size-2 bg-background"/>
                    </div>
                </div>
                <div
                    className={cn("w-full", bottomWhite ? "bg-primary" : "bg-foreground")}
                    style={{height: `${bottomHeight}%`}}
                ></div>
            </div>
        </>
    );
}

export default function GameAdvantageChart({className = ""}: Styleable) {
    const advantageValues = Array.from({length: 200}).map(() => Math.random());
    const playerIsWhite = true;
    const [chartWidth, setChartWidth] = useState(0);
    const chartRef = useRef<HTMLDivElement>(null);

    const updateWidth = () => {
        if (chartRef.current === null) return;
        setChartWidth(chartRef.current.getBoundingClientRect().width);
    };

    useEffect(updateWidth, [chartRef]);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const barsCount = Math.floor(
        (chartWidth - chartPaddingPx + barSpacingPx) / (barWidthPx + barSpacingPx)
    );

    return (
        <div
            ref={chartRef}
            className={cn("h-4/5 md:h-3/5 box-border pl-5 flex overflow-x-auto overflow-y-hidden", className)}
            style={{gap: `${barSpacingPx}px`}}
        >
            {advantageValues.slice(-barsCount).map((e, index) => (
                <Bar
                    fill={e}
                    bottomWhite={playerIsWhite}
                    key={`game_advantage_bar_${index}`}
                />
            ))}
        </div>
    );
}