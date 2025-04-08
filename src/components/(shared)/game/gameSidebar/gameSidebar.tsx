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
    <div className={cn("w-full h-full flex flex-col gap-12", className)}>
      <div
        className="grid grid-rows-[0_0] w-full h-0 border-b-2 border-foreground"
        style={{
          gridTemplateColumns: `repeat(${gameSidebarMenuItems.length}, auto)`,
        }}
      >
        {gameSidebarMenuItems.map((e, index) => (
          <div
            className="relative flex justify-center"
            key={`game_sidebar_item_${index}`}
          >
            <div
              className={cn(
                "absolute bottom-4 font-roboto text-base text-foreground",
                index === currentItem ? "opacity-100" : "opacity-50",
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
          style={{ gridColumnStart: currentItem + 1 }}
        >
          <RhombusDecor />
        </div>
      </div>
      <div className="flex h-full overflow-y-auto border-box">
        <div className="flex gap-5 flex-col items-center w-1/5 border-r-2 border-foreground box-border pt-2">
          {moves.map((e, index) => (
            <div
              key={`move_indicator_${index}`}
              className="flex w-4 h-4 justify-center items-center"
            >
              <RhombusDecor
                className={cn(
                  index % 2 === 0 ? "bg-background" : "bg-foreground",
                  "border-2 border-primary"
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-2/5 border-r-2 border-foreground box-border pt-2">
          {moves.map((e, index) => (
            <div
              key={`move_piece_${index}`}
              className="text-foreground font-roboto text-base h-4 flex items-center box-border pl-2"
            >
              {e.piece}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-1/5 border-r-2 border-foreground box-border pt-2">
          {moves.map((e, index) => (
            <div
              key={`move_from_${index}`}
              className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
            >
              {e.from}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-1/5 box-border pt-2">
          {moves.map((e, index) => (
            <div
              key={`move_to_${index}`}
              className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
            >
              {e.to}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
