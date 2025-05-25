"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";
import { cn } from "@/lib/utils";
import { Styleable } from "@/lib/types";
import { toast } from "sonner";
import { getMultiplayerServiceAPI } from "@/../external/multiplayer/multiplayer";
import type { DocsUser } from "@/../external/auth/auth.schemas";

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

interface Props extends Styleable {
  user: DocsUser;
  accessToken: string;
}

export default function LobbyCreate({
  user,
  accessToken,
  className = "",
}: Props) {
  const [moveTime, setMoveTime] = useState(5 * 60);
  const [createOpen, setCreateOpen] = useState(false);
  const [joinId, setJoinId] = useState("");

  const router = useRouter();
  const api = getMultiplayerServiceAPI();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const createFriendly = async () => {
    const t = toast.loading("Создаём лобби…");
    try {
      const body = {
        game_timeout: moveTime,
        name: `${user.username ?? "Game"} (${fmt(moveTime)})`,
        rating: user.rating ?? 0,
        user_id: user.id!,
      };

      const response = await api.postGameCreateCustom(body, { headers });
      const id = response.data.data.id;

      router.push(`/game/${id}`);
      toast.success("Лобби создано", { id: t });
    } catch {
      toast.error("Не удалось создать игру", { id: t });
    }
  };

  const joinFriendly = async () => {
    if (!joinId.trim()) return toast.error("Введите ID игры");
    const t = toast.loading("Подключаемся…");
    try {
      const body = {
        game_id: joinId.trim(),
        rating: user.rating ?? 0,
        user_id: user.id!,
      };
      const response = await api.postGameJoinCustom(body, { headers });
      const id = response.data.data.id;

      router.push(`/game/${id}`);
      toast.success("Заходим…", { id: t });
    } catch {
      toast.error("Не удалось подключиться", { id: t });
    }
  };

  const timePresets = [180, 300, 600, 1800];

  return (
    <div className={cn("max-w-screen-sm md:py-4 py-16", className)}>
      <div
        className={cn(
          "w-full transition-all duration-300 overflow-hidden",
          createOpen ? "max-h-[600px]" : "max-h-0"
        )}
      >
        <div className="w-full p-8 box-border border-4 border-primary relative mb-4">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setCreateOpen(false)}
          >
            <X />
          </div>

          <div className="w-full flex justify-center items-center font-montserrat font-semibold text-foreground text-2xl mb-8">
            Настройки игры
          </div>

          <div className="w-full">
            <div className="font-roboto italic text-foreground text-lg mb-2">
              Укажите время на ход
            </div>

            <div className="font-montserrat font-medium text-foreground text-lg md:text-2xl mb-5">
              {fmt(moveTime)}
            </div>

            <Slider
              value={[moveTime]}
              onValueChange={([v]) => setMoveTime(Math.round(v))}
              min={180}
              max={1800}
              className="mb-4"
            />

            <div className="w-full flex flex-wrap justify-between gap-2 mb-8">
              {timePresets.map((v) => (
                <div
                  key={v}
                  className="font-montserrat font-medium text-foreground text-base opacity-70 hover:opacity-100 cursor-pointer px-1"
                  onClick={() => setMoveTime(v)}
                >
                  {fmt(v)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mb-4">
          <Button
            className="bg-foreground w-full h-16 hover:bg-primary hover:opacity-80 mb-4"
            variant="transparrent"
            onClick={createFriendly}
          >
            <div className="flex justify-center w-full gap-4">
              <RhombusDecor className="bg-primary size-5" />
              <div className="font-montserrat font-semibold text-background text-2xl">
                Дружеский бой
              </div>
              <RhombusDecor className="bg-primary size-5" />
            </div>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-foreground w-full h-16 hover:bg-primary hover:opacity-80"
                variant="transparrent"
              >
                <div className="flex justify-center w-full gap-4">
                  <RhombusDecor className="bg-primary size-5" />
                  <div className="font-montserrat font-semibold text-background text-2xl">
                    Подключиться по ID
                  </div>
                  <RhombusDecor className="bg-primary size-5" />
                </div>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[420px] p-6">
              <DialogHeader>
                <DialogTitle className="sr-only">ID игры</DialogTitle>
              </DialogHeader>

              <p className="text-xl font-semibold mb-4">Введите ID игры</p>

              <Input
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              />

              <div className="mt-8 space-y-4">
                <Button
                  className="bg-foreground w-full h-16 hover:bg-primary hover:opacity-80"
                  variant="transparrent"
                  onClick={joinFriendly}
                >
                  <div className="flex w-full justify-center gap-4">
                    <RhombusDecor className="bg-primary size-5" />
                    <span className="font-montserrat font-semibold text-background text-2xl">
                      Подключиться
                    </span>
                    <RhombusDecor className="bg-primary size-5" />
                  </div>
                </Button>

                <DialogClose asChild>
                  <Button
                    className="bg-foreground w-full h-16 hover:bg-primary hover:opacity-80"
                    variant="transparrent"
                  >
                    <div className="flex w-full justify-center gap-4">
                      <RhombusDecor className="bg-primary size-5" />
                      <span className="font-montserrat font-semibold text-background text-2xl">
                        Отмена
                      </span>
                      <RhombusDecor className="bg-primary size-5" />
                    </div>
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {!createOpen && (
        <div className="w-full flex justify-center">
          <Button
            className="w-full h-16 text-2xl max-w-xs"
            variant="transparrent"
            size="xl"
            onClick={() => setCreateOpen(true)}
          >
            Создать партию
          </Button>
        </div>
      )}
    </div>
  );
}
