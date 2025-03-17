"use client";

import { useState } from "react";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function LobbySearch({ className = "" }: Styleable) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className={cn("w-full flex flex-row", className)}>
      <form
        action="/search"
        method="get"
        className="flex flex-row items-center w-full"
      >
        <input
          className="font-montserrat text-foreground text-l italic flex-grow bg-transparent outline-none font-semibold h-[70px] pl-1 placeholder-foreground"
          placeholder="Введите имя игрока или партии..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="flex-shrink-0 pr-4">
          <img className="w-7 h-7" src="/icons/loupe.svg" alt="Search" /> {}
        </button>
      </form>
    </div>
  );
}
