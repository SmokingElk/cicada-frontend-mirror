import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import GameOpponentsInfo from "@/components/(shared)/game/gameHeader/gameOpponentsInfo";
import GameAdvantageChart from "@/components/(shared)/game/gameHeader/gameAdvantageChart";

export default function GameHeader({className = ""}: Styleable) {
    return (
        <div
            className={cn(
                "w-full border-y-2 border-foreground flex items-center gap-5",
                className
            )}
        >
            <GameOpponentsInfo className="w-1/4"/>
            <GameAdvantageChart className="w-3/4 border-l-2 border-foreground"/>
        </div>
    );
}
