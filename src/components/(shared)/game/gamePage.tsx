import Wrapper from "@/components/(shared)/common/wrapper";
import GameBoard from "@/components/(shared)/game/gameBoard/gameBoard";
import GameHeader from "@/components/(shared)/game/gameHeader/gameHeader";
import GameNav from "@/components/(shared)/game/gameNav/gameNav";
import GameSidebar from "@/components/(shared)/game/gameSidebar/gameSidebar";

export default function GamePage() {
  return (
    <Wrapper>
      <div className="grid grid-cols-4 grid-rows-[150px_auto] gap-x-5 gap-y-16 mb-20">
        <GameHeader className="col-span-4" />
        <GameNav />
        <GameBoard className="col-span-2" />
        <GameSidebar />
      </div>
    </Wrapper>
  );
}
