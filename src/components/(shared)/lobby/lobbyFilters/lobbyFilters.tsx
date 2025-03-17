"use client";

import { useState } from "react";
import { SliderDouble } from "@/components/ui/slider-double";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function LobbyFilters({ className = "" }: Styleable) {
  const rateMin = 0;
  const rateMax = 1000;

  const [rateRange, setRateRange] = useState(
    [
      rateMin + (rateMax - rateMin) / 3,
      rateMin + ((rateMax - rateMin) / 3) * 2,
    ].map(Math.round)
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full flex justify-center items-center font-montserrat font-semibold text-foreground text-2xl h-20 mb-8">
        Фильтры
      </div>

      <div className="w-full">
        <div className="font-roboto italic text-foreground text-lg mb-3">
          Диапазон рейтинга противника:
        </div>

        <div className="flex">
          <div className="w-20 flex justify-center font-roboto-text-foreground">
            {rateRange[0]}
          </div>
          <SliderDouble
            min={rateMin}
            max={rateMax}
            value={rateRange}
            onValueChange={(newValues) => {
              setRateRange(newValues.map(Math.round));
            }}
          />
          <div className="w-20 flex justify-center font-roboto-text-foreground">
            {rateRange[1]}
          </div>
        </div>
      </div>
    </div>
  );
}
