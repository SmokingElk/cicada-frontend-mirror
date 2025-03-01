import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import GameOpponentsInfo from "./gameOpponentsInfo";
import GameAdvantageChart from "./gameAdvantageChart";

export default function GameHeader({ className = "" }: Styleable) {
  return (
    <div
      className={cn(
        "w-full border-y-2 border-foreground flex items-center gap-5",
        className
      )}
    >
      <GameOpponentsInfo className="w-1/4" />
      <GameAdvantageChart className="w-3/4 border-l-2 border-foreground" />
    </div>
  );
}
