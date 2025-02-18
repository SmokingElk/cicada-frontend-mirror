"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import headerMenuItems from "@/hardcode/headerMenuItems";
import { HeaderMenuItemT } from "@/hardcode/headerMenuItems";

export default function Nav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const getClassName = (item: HeaderMenuItemT) => {
    const highlight = item.highlight ?? item.href;
    const isActive =
      highlight === "/"
        ? currentPath === highlight
        : currentPath.startsWith(highlight);

    return `cursor-pointer px-3 py-2 rounded-md text-foreground transition-opacity ${
      isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
    }`;
  };

  return (
    <nav className="h-full flex justify-center items-center space-x-8">
      {headerMenuItems.map((link) => (
        <Link key={link.href} href={link.href} className={getClassName(link)}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
