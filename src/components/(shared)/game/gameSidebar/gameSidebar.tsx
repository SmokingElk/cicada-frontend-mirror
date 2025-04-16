"use client";

import { useState } from "react";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import gameSidebarMenuItems from "@/hardcode/gameSidebarMenuItems";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

export default function GameSidebar({ className = "" }: Styleable) {
    const [currentItem, setCurrentItem] = useState(0);

    const moves = [
        { piece: "пешка", from: "E2", to: "E4" },
        { piece: "пешка", from: "E7", to: "E5" },
        { piece: "конь", from: "B1", to: "C3" },
        { piece: "король", from: "E1", to: "E2" },
    ];

    return (
        <div className={cn("w-full flex flex-col gap-4 h-full", className)}>
            <div
                className="grid grid-rows-[0_0] w-full h-0 border-b-2 border-foreground"
                style={{
                    gridTemplateColumns: `repeat(${gameSidebarMenuItems.length}, auto)`,
                }}
            >
                {gameSidebarMenuItems.map((e, index) => (
                    <div
                        className="relative flex py-1 justify-center text-center"
                        key={`game_sidebar_item_${index}`}
                    >
                        <div
                            className={cn(
                                "absolute bottom-4 pb-2 font-roboto text-base text-foreground leading-none whitespace-pre-line",
                                index === currentItem ? "opacity-80" : "opacity-50",
                                "hover:opacity-100 transition-all cursor-pointer"
                            )}
                            onClick={() => setCurrentItem(index)}
                        >
                            {e.name}
                        </div>
                    </div>
                ))}

                <div
                    className="w-full flex justify-center items-center transition-all"
                    style={{gridColumnStart: currentItem + 1}}
                >
                    <RhombusDecor/>
                </div>
            </div>
            <div className="flex flex-1 min-h-0">
                <div className="flex flex-col items-center w-1/5 border-r-2 border-foreground overflow-y-auto py-2 space-y-4">
                    {moves.map((e, index) => (
                        <div
                            key={`move_indicator_${index}`}
                            className="flex w-4 h-4 justify-center items-center flex-shrink-0"
                        >
                            <RhombusDecor
                                className={cn(
                                    index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-800",
                                    "border-2 border-primary"
                                )}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-2/5 border-r-2 border-foreground overflow-y-auto py-2 space-y-4">
                    {moves.map((e, index) => (
                        <div
                            key={`move_piece_${index}`}
                            className="text-foreground font-roboto text-base flex items-center pl-2 flex-shrink-0"
                        >
                            {e.piece}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-1/5 border-r-2 border-foreground overflow-y-auto py-2 space-y-4">
                    {moves.map((e, index) => (
                        <div
                            key={`move_from_${index}`}
                            className="text-foreground font-roboto text-base flex justify-center items-center flex-shrink-0"
                        >
                            {e.from}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-1/5 overflow-y-auto py-2 space-y-4">
                    {moves.map((e, index) => (
                        <div
                            key={`move_to_${index}`}
                            className="text-foreground font-roboto text-base flex justify-center items-center flex-shrink-0"
                        >
                            {e.to}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}