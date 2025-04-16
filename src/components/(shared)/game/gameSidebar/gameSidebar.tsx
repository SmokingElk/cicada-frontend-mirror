"use client";

import { Move } from "chess.js";
import { useState } from "react";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pieceNameMap } from "@/hardcode/pieceNameMap";
import gameSidebarMenuItems from "@/hardcode/gameSidebarMenuItems";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

interface GameSidebarProps extends Styleable {
  moves: Move[];
  boardSize: number;
}

export default function GameSidebar({
  className = "",
  moves,
  boardSize,
}: GameSidebarProps) {
  const [currentItem, setCurrentItem] = useState(0);
  console.log(boardSize - 48);

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
      <div
        className="flex overflow-y-auto border-box"
        style={{
          height: `${Math.max(0, boardSize - 48)}px`,
          maxHeight: `${Math.max(0, boardSize - 48)}px`,
        }}
      >
        <div className="flex h-full gap-5 flex-col items-center w-1/5 border-r-2 border-foreground box-border pt-2">
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
          {moves.map((e, index) => {
            const name = pieceNameMap[e.piece];
            const size = name.length > 6 ? "text-sm" : "text-base";

            return (
              <div
                key={`move_piece_${index}`}
                className={cn(
                  "text-foreground font-roboto h-4 flex items-center box-border pl-2",
                  size
                )}
              >
                {name}
              </div>
            );
          })}
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
