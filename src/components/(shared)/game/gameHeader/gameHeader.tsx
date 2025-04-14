import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import GameOpponentsInfo from "@/components/(shared)/game/gameHeader/gameOpponentsInfo";
import GameAdvantageChart from "@/components/(shared)/game/gameHeader/gameAdvantageChart";

export default function GameHeader({className = ""}: Styleable) {
    return (
        <div
            className={cn(
                "w-screen md:w-full h-40 md:h-full border-y-2 border-foreground flex flex-col md:flex-row items-center gap-2 md:gap-5",
                className
            )}
        >
            <GameOpponentsInfo className="w-full md:w-1/4"/>
            <GameAdvantageChart className="w-full md:w-3/4 border-l-2 border-foreground"/>
        </div>
    );
}