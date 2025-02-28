import Wrapper from "../common/wrapper";
import GameBoard from "./gameBoard/gameBoard";
import GameHeader from "./gameHeader/gameHeader";
import GameNav from "./gameNav/gameNav";
import GameSidebar from "./gameSidebar/gameSidebar";

export default function GamePage() {
  return (
    <Wrapper>
      <div className="grid grid-cols-4 grid-rows-[150px_auto] gap-5">
        <GameHeader className="col-span-4" />
        <GameNav />
        <GameBoard className="col-span-2" />
        <GameSidebar />
      </div>
    </Wrapper>
  );
}
