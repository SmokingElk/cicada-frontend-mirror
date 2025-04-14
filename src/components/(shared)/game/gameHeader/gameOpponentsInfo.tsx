"use client";

import {useState} from "react";
import Image from "next/image";
import {Styleable} from "@/lib/types";
import {cn} from "@/lib/utils";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

import AvatarPlaceholder from "@/../public/avatars/avatarPlaceholder.png";
import AvatarOpponentPlaceholder from "@/../public/avatars/avatarOpponentPlaceholder.png";

export default function GameOpponentsInfo({className = ""}: Styleable) {
    const [username, setUsername] = useState("playerNickname");
    const [usernameOpponent, setUsernameOpponent] = useState("opponentNickname");
    const [rating, setRating] = useState(1240);
    const [ratingOpponent, setRatingOpponent] = useState(1450);

    const [avatar, setAvatar] = useState(AvatarPlaceholder);
    const [avatarOpponent, setAvatarOpponent] = useState(
        AvatarOpponentPlaceholder
    );

    return (
        <div className={cn("w-full flex flex-col justify-center", className)}>
            <div className="w-full flex flex-row text-base md:text-lg text-foreground font-roboto justify-center">
                {username}
                <RhombusDecor className="bg-primary size-2 md:size-3 mx-2 mt-2"/>
                {rating}
            </div>

            <section className="flex flex-row justify-center gap-1 md:gap-6">
                <div className="w-full flex justify-center">
                    <div className="w-[40px] md:w-[80px] h-[40px] md:h-[80px]">
                        <Image
                            src={avatar}
                            width={80}
                            height={80}
                            objectFit="cover"
                            alt="avatar"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className="relative flex flex-row justify-center items-center">
                    <div className="absolute w-0.5 h-10 md:h-28 bg-foreground rotate-45 origin-center"></div>
                    <RhombusDecor className="size-3 md:size-5"/>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-[40px] md:w-[80px] h-[40px] md:h-[80px]">
                        <Image
                            src={avatarOpponent}
                            width={80}
                            height={80}
                            objectFit="cover"
                            alt="avatarOpponent"
                            className="rounded-full"
                        />
                    </div>
                </div>
            </section>

            <div className="w-full flex flex-row text-base md:text-lg text-foreground font-roboto justify-center">
                {usernameOpponent}
                <RhombusDecor className="bg-primary size-2 md:size-3 mx-2 mt-2"/>
                {ratingOpponent}
            </div>
        </div>
    );
}