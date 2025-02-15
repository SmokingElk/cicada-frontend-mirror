"use client";

import Link from "next/link";
import RhombusDecor from "../common/rhombusDecor";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Styleable } from "@/lib/types";

export default function ProfileMenu({ className = "" }: Styleable) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/info", text: "Профиль" },
    { href: "/stats", text: "Статистика" },
  ];

  let activeIndex = menuItems.findIndex((e) => pathname.includes(e.href));

  return (
    <div
      className={cn(
        "w-full grid justify-items-center items-center border-b-[2px] border-foreground grid-rows-[60px_0px]",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${menuItems.length}, 150px)` }}
    >
      {menuItems.map((e, index) => (
        <Link
          key={e.href}
          href={e.href}
          className={cn(
            "font-roboto text-lg text-foreground",
            index == activeIndex ? "opacity-100" : "opacity-50"
          )}
        >
          {e.text}
        </Link>
      ))}

      <div
        className="transition-all"
        style={{ gridColumnStart: `${activeIndex}` }}
      >
        <RhombusDecor />
      </div>
    </div>
  );
}
