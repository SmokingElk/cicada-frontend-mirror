"use client";

import { Move } from "chess.js";
import { useEffect, useRef, useState } from "react";
import Wrapper from "@/components/(shared)/common/wrapper";
import GameHeader from "@/components/(shared)/game/gameHeader/gameHeader";
import GameNav from "@/components/(shared)/game/gameNav/gameNav";
import GameSidebar from "@/components/(shared)/game/gameSidebar/gameSidebar";
import GameBoard from "@/components/(shared)/game/gameBoard/gameBoard";

export default function GamePage() {
  // это бы лучше сделать глобальным стейтом через Redux
  const [moves, setMoves] = useState<Move[]>([]);

  const addMove = (move: Move) => {
    setMoves((prevMoves) => [...prevMoves, move]);
  };

  const [boardSize, setBoardSize] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current === null) return;

    const rect = boardRef.current.getBoundingClientRect();

    setBoardSize(rect.height);
  }, [boardRef.current]);

  return (
    <Wrapper>
      <div className="grid grid-cols-4 grid-rows-[150px_auto] gap-x-5 gap-y-16 mb-20">
        <GameHeader className="col-span-4" />
        <GameNav />
        <GameBoard
          boardRef={boardRef}
          className="col-span-2"
          addMove={addMove}
        />
        <GameSidebar moves={moves} boardSize={boardSize} />
      </div>
    </Wrapper>
  );
}
