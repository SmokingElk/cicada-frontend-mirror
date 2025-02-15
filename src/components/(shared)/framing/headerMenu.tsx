"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/game", label: "Игра" },
    { href: "/profile", label: "Профиль" },
  ];

  const getClassName = (href: string) => {
    const isActive =
      href === "/" ? currentPath === href : currentPath.startsWith(href);

    return `cursor-pointer px-3 py-2 rounded-md text-foreground transition-opacity ${
      isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
    }`;
  };

  return (
    <nav className="h-full flex justify-center items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={getClassName(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
