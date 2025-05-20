"use client";

import Link from "next/link";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GameNavProps extends Styleable {
  giveUp: () => void;
  offerDraw: () => void;
}

export default function GameNav({
  className = "",
  giveUp,
  offerDraw,
}: GameNavProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-row md:flex-col justify-end space-x-1 md:space-y-6",
        className
      )}
    >
      <Button
        onClick={offerDraw}
        className="w-1/2 md:w-full h-10 md:h-16 hover:bg-primary hover:opacity-80"
        variant="transparrent"
        size="lg"
      >
        Ничья
      </Button>

      <Button
        onClick={giveUp}
        className="w-1/2 md:w-full h-10 md:h-16 hover:bg-primary hover:opacity-80"
        variant="transparrent"
        size="lg"
      >
        Сдаться
      </Button>
    </div>
  );
}
