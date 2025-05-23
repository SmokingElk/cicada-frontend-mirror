"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Wrapper from "@/components/(shared)/common/wrapper";
import LobbyRating from "@/components/(shared)/lobby/lobbyRating/lobbyRating";
import LobbyCreate from "@/components/(shared)/lobby/lobbyCreate/lobbyCreate";
import { Button } from "@/components/ui/button";
import Chessboard from "@/../public/images/chessboard.svg";
import { getMultiplayerServiceAPI } from "@/../external/multiplayer/multiplayer";
import type { DocsUser } from "@/../external/auth/auth.schemas";
import { toast } from "sonner";
import { DocsJoinGameRequest } from "@/../external/multiplayer/multiplayer.schemas";

interface Props {
  user: DocsUser;
  accessToken: string;
}

export default function LobbyPage({ user, accessToken }: Props) {
  const router = useRouter();
  const [finding, setFinding] = useState(false);

  const handleSearch = async () => {
    if (finding || !user.id) return;

    setFinding(true);
    const t = toast.loading("Ищем соперника…");

    const body: DocsJoinGameRequest = {
      rating: user.rating ?? 0,
      user_id: user.id,
    };

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await getMultiplayerServiceAPI().postGameJoin(
        body as DocsJoinGameRequest,
        { headers }
      );

      const id = response.data.data.id;

      router.push(`/game/${id}`);
      toast.success("Переходим в игру…", { id: t });
    } catch (err) {
      toast.error("Не удалось найти соперника", { id: t });
      console.error(err);
    } finally {
      setFinding(false);
    }
  };

  return (
    <Wrapper className="min-w-screen md:w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 md:pt-12">
      <div className="hidden md:flex flex-col items-center p-4 md:pt-40">
        <Image
          className="w-full h-[400px]"
          src={Chessboard}
          alt="grid"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-col items-center gap-8 p-4 pt-3 md:justify-start md:pt-48">
        <LobbyRating rating={user.rating ?? 0} />

        <Button
          className="h-16 text-2xl px-8 w-full max-w-xs"
          variant="transparrent"
          onClick={handleSearch}
          disabled={finding}
        >
          {finding ? "Поиск…" : "Поиск соперника"}
        </Button>

        <LobbyCreate user={user} accessToken={accessToken} />
      </div>
    </Wrapper>
  );
}
