"use client";

import {Chess, Square, Move} from "chess.js";
import React, {Ref, useEffect, useState} from "react";
import {Chessboard} from "react-chessboard";
import {cn} from "@/lib/utils";
import {Styleable} from "@/lib/types";
import {toast} from "sonner";

const availableMarkStyle = {
	background: "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
	borderRadius: "50%",
};

export interface MoveParams {
	from: Square;
	to: Square;
	promotion: string;
}

interface BoardTheme {
	darkSquareColor: string;
	lightSquareColor: string;
}

interface GameBoardProps extends Styleable {
	sendMove: (move: Move) => void;
	newMove: (move: Move) => void;
	opponentMove: string | null;
	boardRef: Ref<HTMLDivElement>;
	allowMove: boolean;
	playerColor: string;

	draw: () => void;
	win: () => void;
	lose: () => void;
}

function createAvailableMoves(
	game: Chess,
	from: Square
): Record<string, React.CSSProperties> {
	const moves = game.moves({square: from});

	const newMoveSquares: Record<string, React.CSSProperties> = {};

	moves.forEach((move: string) => {
		let square = move.slice(-2);
		newMoveSquares[square] = availableMarkStyle;
	});

	return newMoveSquares;
}

export default function GameBoard({
																		className = "",
																		sendMove,
																		newMove,
																		boardRef,
																		allowMove,
																		draw,
																		win,
																		lose,
																		playerColor,
																		opponentMove,
																	}: GameBoardProps) {
	const [game, setGame] = useState(new Chess());
	const [moveSquares, setMoveSquares] = useState({});
	const [showAvailableMoves, setShowAvailableMoves] = useState(true); // если нужно будет отключать

	const [boardTheme, setBoardTheme] = useState<BoardTheme>({
		lightSquareColor: "#895d30",
		darkSquareColor: "#5d4022",
	});

	function makeMove(move: MoveParams | string) {
		const newGame = new Chess(game.fen());
		const res = newGame.move(move);
		setGame(newGame);

		if (res != null) newMove(res);

		return res;
	}

	useEffect(() => {
		if (opponentMove == null || game.turn() == playerColor) return;
		try {
			makeMove(opponentMove);
		} catch (err) {
			console.error(err);
		}
	}, [opponentMove]);

	function showIncorrectMoveMessage() {
		toast.error(`Недопустимый ход!`);
	}

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
		if (!allowMove) return false;

		let move = null;

		try {
			move = makeMove({
				from: sourceSquare,
				to: targetSquare,
				promotion: piece[1].toLowerCase(),
			});

			if (move != null) sendMove(move);
		} catch (error) {
			showIncorrectMoveMessage();
		}

		return move != null;
	}

	useEffect(
		function () {
			if (!game.isGameOver()) return;

			if (game.isDraw()) {
				draw();
				return;
			}

			const playerWin = game.turn() != playerColor;
			if (playerWin) {
				win();
			}
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
			ref={boardRef}
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
				customSquareStyles={{...moveSquares}}
				isDraggablePiece={isDraggablePiece}
				customBoardStyle={{
					pointerEvents:
						!game.isGameOver() && allowMove && game.turn() == playerColor
							? "all"
							: "none",
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
