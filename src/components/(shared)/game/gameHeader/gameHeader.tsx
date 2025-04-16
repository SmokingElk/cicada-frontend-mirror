import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import GameOpponentsInfo from "@/components/(shared)/game/gameHeader/gameOpponentsInfo";
import GameAdvantageChart from "@/components/(shared)/game/gameHeader/gameAdvantageChart";

export default function GameHeader({className = ""}: Styleable) {
    return (
        <div
            className={cn(
                "w-full h-20 md:h-full border-y-2 border-foreground flex flex-row items-center md:gap-5 overflow-hidden",
                className
            )}
        >
            <GameOpponentsInfo className="w-1/2 md:w-1/4 min-w-0 ml-3"/>
            <GameAdvantageChart className="w-1/2 md:w-3/4 border-l-2 border-foreground min-w-0"/>
        </div>
    );
}