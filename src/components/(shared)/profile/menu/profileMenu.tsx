"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import menuItems from "@/hardcode/profileMenuItems";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

export default function ProfileMenu({ className = "" }: Styleable) {
  const pathname = usePathname();
  let activeIndex = menuItems.findIndex((e) => pathname.includes(e.href));

  return (
      <>
        <div className={cn(
            "hidden md:grid w-full justify-items-center items-center border-b-[2px] border-foreground grid-rows-[60px_0px]",
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
              style={{ gridColumnStart: `${activeIndex + 1}` }}
          >
            <RhombusDecor />
          </div>
        </div>

        <div className={cn(
            "md:hidden flex flex-col w-full border-b-[2px] border-foreground relative",
            className
        )}>
          <div className="flex justify-center items-center pb-2">
            <div className="flex space-x-2">
              {menuItems.map((e, index) => (
                  <Link
                      key={e.href}
                      href={e.href}
                      className={cn(
                          "font-roboto text-lg text-foreground px-3 py-1",
                          index == activeIndex ? "opacity-100" : "opacity-50"
                      )}
                  >
                    {e.text}
                  </Link>
              ))}
            </div>
          </div>

          <div
              className="absolute bottom-0 transition-all duration-300"
              style={{
                left: `calc(${(activeIndex * 100) / menuItems.length}% + ${(100 / menuItems.length) / 2}% - 8px)`,
                transform: 'translate(-50%, 50%)'
              }}
          >
            <RhombusDecor />
          </div>
        </div>
      </>
  );
}