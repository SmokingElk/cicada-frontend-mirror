import Wrapper from "@/components/(shared)/common/wrapper";
import GameBoard from "@/components/(shared)/game/gameBoard/gameBoard";
import GameHeader from "@/components/(shared)/game/gameHeader/gameHeader";
import GameNav from "@/components/(shared)/game/gameNav/gameNav";
import GameSidebar from "@/components/(shared)/game/gameSidebar/gameSidebar";

export default function GamePage() {
    return (
        <Wrapper className="min-h-screen max-w-screen">
            <div className="flex flex-col md:grid md:grid-cols-4 md:grid-rows-[150px_auto] gap-x-5 gap-y-16 mb-10">
                <GameHeader className="col-span-4 order-1"/>
                <GameNav className="order-3 md:order-2"/>
                <GameBoard className="order-2 md:order-3 col-span-2"/>
                <GameSidebar className="order-4"/>
            </div>
        </Wrapper>
    );
}
