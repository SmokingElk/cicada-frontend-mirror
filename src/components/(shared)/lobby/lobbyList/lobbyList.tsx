"use client";

import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import DecoratedTile from "@/components/(shared)/common/decoratedTile";

export default function LobbyList({className = ""}: Styleable) {
    const parties = [
        {
            partyName: "Мат в 7 ходов",
            opponentName: "PlayerName",
            time: "3:00",
            rating: "100",
            href: "/",
            imageUrl: "/avatars/avatarPlaceholder.png"
        },
        {
            partyName: "Унижаю новичков",
            opponentName: "IvanIvanich",
            time: "3:00",
            rating: "1000",
            href: "/",
            imageUrl: "/avatars/avatarOpponentPlaceholder.png"
        },
        {
            partyName: "Я новичок",
            opponentName: "KingOfWorld",
            time: "10:00",
            rating: "0",
            href: "/",
            imageUrl: "/avatars/avatarPlaceholder.png"
        },
    ];

    return (
        <div className={cn("w-full flex flex-col h-auto justify-start", className)}>
            <div
                className="font-montserrat text-foreground text-2xl md:text-4xl outline-none font-semibold pt-6 pb-3 md:pb-12 placeholder-foreground">
                Ожидают соперника:
            </div>
            <ul className="space-y-4 md:pr-4">
                {parties.map((party, index) => (
                    <li key={index}>
                        <div className="w-full">
                            <DecoratedTile className="text-sm md:text-base text-background min-w-full">
                                <div className="flex flex-col w-full max-w-screen-sm md:w-[550px] p-2 pl-3">
                                    <div className="flex flex-row w-full pb-1">
                                        <span className="flex-start">{party.partyName}</span>
                                        <span className="ml-auto">{party.time}</span>
                                    </div>
                                    <hr className="border-t border-gray-300 py-1 h-1 w-full"/>
                                    <div className="flex flex-row-1/2 w-full">
                                        <img
                                            src={party.imageUrl}
                                            className="w-7 h-7 rounded-full mr-2"
                                        />
                                        <span className="flex-start">{party.opponentName}</span>
                                        <span className="ml-auto">Рейтинг: {party.rating}</span>
                                    </div>
                                </div>
                            </DecoratedTile>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}