"use client";

import { useState } from "react";
import LineSeparator from "../../common/lineSeparator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AvatarPlaceholder from "@/../public/avatars/avatarPlaceholder.png";

export default function profileInfoContent() {
  const [username, setUsername] = useState("playerNickname");
  const [age, setAge] = useState(20);
  const [city, setCity] = useState("Москва");
  const [description, setDescription] = useState("Lorem ipsum sit dolor amit.");

  const [avatar, setAvatar] = useState(AvatarPlaceholder);

  return (
    <div className="flex gap-4 justify-stretch">
      <div className="w-full">
        <div className="w-5/6">
          <input
            className="font-montserrat text-foreground text-4xl w-full bg-transparent outline-none font-semibold h-[70px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <LineSeparator width={100} className="mt-0 mb-9" />
        </div>

        <div className="w-full text-xl text-foreground font-roboto mb-14">
          {age} лет, {city}
        </div>

        <div className="font-montserrat text-foreground text-2xl font-semibold mb-5">
          Описание:
        </div>

        <textarea
          className={cn(
            "border-[2px] border-foreground w-full h-[260px] p-4 box-border",
            "outline-none resize-none bg-transparent",
            "font-main text-xl text-foreground"
          )}
          placeholder="Коротко обо мне..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[300px] h-[300px]">
          <Image
            src={avatar}
            width={300}
            height={300}
            objectFit="cover"
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
