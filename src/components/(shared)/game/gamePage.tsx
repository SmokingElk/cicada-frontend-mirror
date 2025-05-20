"use client";

import { Move } from "chess.js";
import { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "@/components/(shared)/common/wrapper";
import GameHeader from "@/components/(shared)/game/gameHeader/gameHeader";
import GameNav from "@/components/(shared)/game/gameNav/gameNav";
import GameSidebar from "@/components/(shared)/game/gameSidebar/gameSidebar";
import GameBoard from "@/components/(shared)/game/gameBoard/gameBoard";
import GameResultModal from "@/components/(shared)/game/gameResultModal/gameResultModal";
import {GameResult} from "@/components/(shared)/game/gameResultModal/gameResultModal";
import { toast } from "sonner";
import useWS, { ReadyState } from "react-use-websocket";
import { getAuthAPI } from "../../../../external/auth/auth";
import type { Session } from "next-auth";
import type { RawAxiosRequestHeaders } from "axios";
import { Button } from "@/components/ui/button";
import { start } from "repl";
import { json } from "stream/consumers";

const MESSAGE_TYPE_GAME_START = "game_start";
const MESSAGE_TYPE_START = "start";
const MESSAGE_TYPE_MOVE = "move";
const MESSAGE_TYPE_FINISH = "finish";

interface WSMessage {
  type:
      | typeof MESSAGE_TYPE_GAME_START
      | typeof MESSAGE_TYPE_START
      | typeof MESSAGE_TYPE_MOVE
      | typeof MESSAGE_TYPE_FINISH;
}

interface WSMessageGameStart {
  type: typeof MESSAGE_TYPE_GAME_START;
  data: {
    color: string;
    game: {
      players: {
        id: string;
      }[];
    };
  };
}

interface WSMessageMove {
  type: typeof MESSAGE_TYPE_MOVE;
  payload: {
    user_id: string;
    move: string;
  };
}

interface WSMessageFinish {
  type: typeof MESSAGE_TYPE_FINISH;
  payload: {
    winner_id: string;
  };
}

interface GamePageProps {
  id: string;
  session: Session;
}

export default function GamePage({ id, session }: GamePageProps) {
  const authAPI = getAuthAPI();

  // это бы лучше сделать глобальным стейтом через Redux
  const [allowMove, setAllowMove] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState<Move[]>([]);
  const [opponentMove, setOpponentMove] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [playerColor, setPlayerColor] = useState<string>("w");
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [ratingChange, setRatingChange] = useState<number>(0);
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setIsDebugMode(searchParams.get('debug') === 'true');
  }, []);

  useEffect(() => {
    if (!session.accessToken) return;

    (async function () {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
      } as RawAxiosRequestHeaders;

      const response = authAPI.getAuthMe({ headers });
      const id = (await response).data.data?.id;
      if (id != null) setUserId(id);
    })();
  }, [session.accessToken]);

  useEffect(() => {
    if (userId == null) return;
    console.log(userId);
  }, [userId]);

  const [boardSize, setBoardSize] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const { sendMessage, lastMessage, readyState } = useWS<WSMessage>(
      userId
          ? `${process.env.NEXT_PUBLIC_MULTIPLAYER_SERVICE_URL}/${id}?user_id=${userId}`
          : null
  );

  const sendMove = useCallback(
      (move: Move) => {
        if (!gameStarted || userId == null) return;

        const message: WSMessageMove = {
          type: MESSAGE_TYPE_MOVE,
          payload: {
            user_id: userId,
            move: `${move.from}-${move.to}`,
          },
        };

        sendMessage(JSON.stringify(message));
      },
      [readyState, sendMessage, gameStarted, userId]
  );

  const sendWin = useCallback(
      (id: string | null = null) => {
        if (!gameStarted || userId == null) return;

        const message: WSMessageFinish = {
          type: MESSAGE_TYPE_FINISH,
          payload: {
            winner_id: id ?? userId,
          },
        };

        sendMessage(JSON.stringify(message));
      },
      [readyState, sendMessage, gameStarted, userId]
  );

  const newMove = (move: Move) => {
    setMoves((prevMoves) => [...prevMoves, move]);
  };

  useEffect(() => {
    if (lastMessage === null) return;
    console.log(lastMessage);

    const message: WSMessage = JSON.parse(lastMessage.data);

    ({
      [MESSAGE_TYPE_GAME_START]: () => {
        console.log(
            "set color:",
            (message as WSMessageGameStart).data.color[0]
        );
        const startMsg: WSMessageGameStart = message as WSMessageGameStart;
        setPlayerColor(startMsg.data.color[0]);

        for (let player of startMsg.data.game.players) {
          if (player.id != userId) {
            setOpponentId(player.id);
            break;
          }
        }
      },

      [MESSAGE_TYPE_START]: () => {
        console.log("start");
        setGameStarted(true);
      },

      [MESSAGE_TYPE_MOVE]: () => {
        console.log("opponent move", (message as WSMessageMove).payload.move);
        if ((message as WSMessageMove).payload.user_id == userId) return;

        setOpponentMove((message as WSMessageMove).payload.move);
      },

      [MESSAGE_TYPE_FINISH]: () => {
        console.log(
            "finish",
            (message as WSMessageFinish).payload.winner_id,
            userId
        );

        if ((message as WSMessageFinish).payload.winner_id === userId) {
          win();
        } else {
          lose();
        }
      },
    })[message.type]();
  }, [lastMessage]);

  useEffect(() => {
    if (boardRef.current === null) return;

    const rect = boardRef.current.getBoundingClientRect();

    setBoardSize(rect.height);
  }, [boardRef.current]);

  useEffect(() => {
    console.log(
        "ws: ",
        {
          [ReadyState.CONNECTING]: "Connecting",
          [ReadyState.OPEN]: "Open",
          [ReadyState.CLOSING]: "Closing",
          [ReadyState.CLOSED]: "Closed",
          [ReadyState.UNINSTANTIATED]: "Uninstantiated",
        }[readyState]
    );
  }, [readyState]);

  const win = () => {
    setAllowMove(false);
    setGameResult("win");
    setRatingChange(1);
    toast.success("Победа!");
  };

  const lose = () => {
    setAllowMove(false);
    setGameResult("lose");
    setRatingChange(-1);
    toast.success("Поражение!");
  };

  const draw = () => {
    setAllowMove(false);
    setGameResult("draw");
    setRatingChange(0);
    toast.success("Ничья!");
  };

  const giveUp = useCallback(() => {
    if (opponentId == null) return;
    setAllowMove(false);
    setGameResult("surrender");
    setRatingChange(-1);
    sendWin(opponentId);
  }, [opponentId]);

  const offerDraw = () => {
    // отправка запроса на сервер, второму игроку должно высветится предложение
  };

  return (
      <Wrapper className="min-h-screen h-auto max-w-screen">
        <div className="flex flex-col md:grid md:grid-cols-4 md:grid-rows-[150px_auto] gap-x-5 gap-y-16 mb-10">
          {isDebugMode && (<div className="fixed bottom-4 right-4 flex gap-2 z-50">
            <Button variant="outline" onClick={() => setGameResult("win")}>
              Тест: Победа
            </Button>
            <Button variant="outline" onClick={() => setGameResult("lose")}>
              Тест: Поражение
            </Button>
            <Button variant="outline" onClick={() => setGameResult("draw")}>
              Тест: Ничья
            </Button>
            <Button variant="outline" onClick={() => setGameResult("surrender")}>
              Тест: Сдался
            </Button>
          </div>)}
          <GameHeader className="col-span-4 order-1"/>
          <GameNav
              className="order-3 md:order-2"
              giveUp={giveUp}
              offerDraw={offerDraw}
          />
          <GameBoard
              boardRef={boardRef}
              className="order-2 md:order-3 col-span-2 w-full overflow-hidden"
              sendMove={sendMove}
              newMove={newMove}
              opponentMove={opponentMove}
              allowMove={allowMove && gameStarted}
              draw={draw}
              win={sendWin}
              lose={lose}
              playerColor={playerColor}
          />
          <GameSidebar moves={moves} boardSize={boardSize} className="order-4"/>
          <GameResultModal
              result={gameResult}
              ratingChange={ratingChange}
              onClose={() => setGameResult(null)}
          />
        </div>
      </Wrapper>
  );
}
