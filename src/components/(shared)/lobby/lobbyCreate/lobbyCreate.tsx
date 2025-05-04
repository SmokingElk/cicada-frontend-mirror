"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

interface ColorSelectorProps extends Styleable {
  selected: boolean;
  setColor: () => void;
}

function ColorSelector({
                         selected,
                         setColor,
                         className = "",
                       }: ColorSelectorProps) {
  const center =
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

  return (
      <div className="relative w-6 h-4 cursor-pointer" onClick={setColor}>
        <RhombusDecor
            className={cn(center, "border-[3px] size-5 border-primary", className)}
        />
        {selected && <RhombusDecor className={cn(center, "size-2 bg-primary")} />}
      </div>
  );
}

export default function LobbyCreate({ className = "" }: Styleable) {
  const [gameName, setGameName] = useState("");
  const [moveTime, setMoveTime] = useState(5 * 60);
  const [isWhite, setIsWhite] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const timeMin = 3 * 60;
  const timeMax = 30 * 60;
  const timePresets = [3 * 60, 5 * 60, 10 * 60, 30 * 60];

  return (
      <div className={cn("max-w-screen-sm md:py-4 py-16", className)}>
        <div
            className={cn(
                "w-full transition-all duration-300 overflow-hidden",
                createOpen ? "max-h-[1000px]" : "max-h-0"
            )}
        >
          <div className="w-full p-8 box-border border-4 border-primary relative mb-4">
            <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setCreateOpen(false)}
            >
              <X />
            </div>

            <div className="w-full flex justify-center items-center font-montserrat font-semibold text-foreground text-2xl mb-8">
              Создать игру
            </div>

            <div className="w-full border-b-2 border-foreground mb-8">
              <input
                  className={cn(
                      "font-roboto text-foreground text-lg w-full bg-transparent outline-none",
                      "placeholder:italic placeholder:text-foreground placeholder:opacity-50"
                  )}
                  placeholder="Введите имя игры"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <div className="font-roboto italic text-foreground text-lg mb-2">
                Укажите время на ход
              </div>

              <div className="font-montserrat font-medium text-foreground text-lg md:text-2xl mb-5">
                {formatTime(moveTime)}
              </div>

              <Slider
                  value={[moveTime]}
                  onValueChange={(e) => setMoveTime(Math.round(e[0]))}
                  min={timeMin}
                  max={timeMax}
                  className="mb-4"
              />

              <div className="w-full flex flex-wrap justify-between gap-2 mb-8">
                {timePresets.map((e, index) => (
                    <div
                        className="font-montserrat font-medium text-foreground text-base opacity-70 hover:opacity-100 cursor-pointer px-1"
                        key={`time_preset_${index}`}
                        onClick={() => setMoveTime(e)}
                    >
                      {formatTime(e)}
                    </div>
                ))}
              </div>

              <div className="w-full">
                <div className="font-roboto italic text-foreground text-lg mb-2">
                  Ваш цвет: {isWhite ? "белый" : "черный"}
                </div>

                <div className="flex gap-6">
                  <ColorSelector
                      setColor={() => setIsWhite(false)}
                      selected={!isWhite}
                  />
                  <ColorSelector
                      setColor={() => setIsWhite(true)}
                      selected={isWhite}
                      className="bg-background"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-4">
            <Button
                className="bg-foreground w-full h-16 rounded-none hover:bg-primary"
                asChild
            >
              <Link href="/game" className="flex justify-center w-full gap-4">
                <RhombusDecor className="bg-primary size-5" />
                <div className="font-montserrat font-semibold text-background text-2xl">
                  Готово
                </div>
                <RhombusDecor className="bg-primary size-5" />
              </Link>
            </Button>
          </div>
        </div>

        {!createOpen && (
            <div className="w-full flex justify-center">
              <Button
                  className="w-5/6 h-16 text-2xl"
                  variant="transparrent"
                  size="xl"
                  onClick={() => setCreateOpen(true)}
              >
                Создать партию
              </Button>
            </div>
        )}
      </div>
  );
}