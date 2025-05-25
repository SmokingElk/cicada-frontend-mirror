"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export type GameResult = "win" | "lose" | "draw" | "surrender" | null;

const ArrowUp = () => <span className="text-2xl text-green-500">↑</span>;
const ArrowDown = () => <span className="text-2xl text-red-500">↓</span>;
const Circle = () => <span className="text-2xl text-gray-500">●</span>;

interface GameResultModalProps {
    result: GameResult;
    ratingChange?: number;
    onClose: () => void;
    gameId?: string;
}

export default function GameResultModal({
                                            result,
                                            ratingChange = 0,
                                            onClose,
                                            gameId
                                        }: GameResultModalProps) {
    const router = useRouter();

    if (!result) return null;

    const handleAnalytics = () => {
        if (gameId) {
            alert(`Аналитика партии ${gameId} будет доступна позже`);
        }
    };

    const handleMenu = () => {
        router.push("/lobby");
    };

    const titles = {
        win: "Победа!",
        lose: "Поражение",
        draw: "Ничья",
        surrender: "Вы сдались",
    };

    const messages = {
        win: "Вы выиграли партию!",
        lose: "Вы проиграли партию",
        draw: "Партия завершилась вничью",
        surrender: "Вы сдались",
    };

    // Добавляем отображение стрелок в зависимости от результата
    const ratingIcons = {
        win: <ArrowUp />,
        lose: <ArrowDown />,
        draw: <Circle />,
        surrender: <ArrowDown />,
    };

    return (
        <Dialog open={!!result} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl">
                        {titles[result]}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="flex flex-row gap-4">
                    <p className="text-2xl">{messages[result]}</p>
                    <div className="flex items-center gap-2 pb-1">
                        {ratingIcons[result]}
                        {ratingChange !== 0 && (
                            <span className="font-medium">
                                {ratingChange > 0 ? '+' : ''}
                                {ratingChange}
                            </span>
                        )}
                    </div>
                    </div>

                    <div className="flex gap-4 w-full mt-4">
                        <Button
                            variant="transparrent"
                            className="flex-1 text-xl hover:bg-primary hover:opacity-80"
                            onClick={handleAnalytics}
                        >
                            Посмотреть аналитику
                        </Button>
                        <Button
                            variant="transparrent"
                            className="flex-1 text-xl hover:bg-primary hover:opacity-80"
                            onClick={handleMenu}
                        >
                            В меню
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}