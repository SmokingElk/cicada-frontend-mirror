"use client";

import { Chess, Square } from "chess.js";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { cn } from "@/lib/utils";
import { Styleable } from "@/lib/types";

const availableMarkStyle = {
  background: "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
  borderRadius: "50%",
};

interface Move {
  from: Square;
  to: Square;
  promotion: string;
}

interface BoardTheme {
  darkSquareColor: string;
  lightSquareColor: string;
}

function createAvailableMoves(
  game: Chess,
  from: Square
): Record<string, React.CSSProperties> {
  const moves = game.moves({ square: from });

  const newMoveSquares: Record<string, React.CSSProperties> = {};

  moves.forEach((move: string) => {
    let square = move.slice(-2);
    newMoveSquares[square] = availableMarkStyle;
  });

  return newMoveSquares;
}

export default function GameBoard({ className = "" }: Styleable) {
  const [game, setGame] = useState(new Chess());
  const [moveSquares, setMoveSquares] = useState({});
  const playerColor: String = "w"; // достать с сервера
  const [showAvailableMoves, setShowAvailableMoves] = useState(true); // если нужно будет отключать

  const [boardTheme, setBoardTheme] = useState<BoardTheme>({
    lightSquareColor: "#895d30",
    darkSquareColor: "#5d4022",
  });

  function makeMove(move: Move | string) {
    const newGame = new Chess(game.fen());
    const res = newGame.move(move);
    setGame(newGame);
    return res;
  }

  function opponentMove() {
    const moves = game.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    makeMove(randomMove);
  }

  function showIncorrectMoveMessage(move: Move) {}

  function onDragStart(piece: String, sourceSquare: Square) {
    if (!showAvailableMoves) return;

    const newMoveSquares = createAvailableMoves(game, sourceSquare);
    setMoveSquares(newMoveSquares);
  }

  function onDragEnd(piece: String, sourceSquare: Square) {
    if (!showAvailableMoves) return;

    setMoveSquares({});
  }

  function onPieceDrop(
    sourceSquare: Square,
    targetSquare: Square,
    piece: String
  ): boolean {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase(),
    });

    if (move == null) {
      showIncorrectMoveMessage(move);
      return false;
    }

    return true;
  }

  useEffect(
    function () {
      if (game.turn() == playerColor) return;
      opponentMove();
    },
    [game]
  );

  function isDraggablePiece({
    piece,
    sourceSquare,
  }: {
    piece: string;
    sourceSquare: Square;
  }): boolean {
    return piece[0] == playerColor;
  }

  return (
    <div
      className={cn(
        "w-full aspect-square border-foreground border-2",
        className
      )}
    >
      <Chessboard
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        onPieceDragBegin={onDragStart}
        onPieceDragEnd={onDragEnd}
        customSquareStyles={{ ...moveSquares }}
        isDraggablePiece={isDraggablePiece}
        customBoardStyle={{
          pointerEvents: game.turn() == playerColor ? "all" : "none",
        }}
        boardOrientation={playerColor === "w" ? "white" : "black"}
        customDarkSquareStyle={{
          backgroundColor: boardTheme.lightSquareColor,
        }}
        customLightSquareStyle={{
          backgroundColor: boardTheme.darkSquareColor,
        }}
        customDropSquareStyle={{
          filter: "brightness(0.8)",
        }}
      />
    </div>
  );
}
