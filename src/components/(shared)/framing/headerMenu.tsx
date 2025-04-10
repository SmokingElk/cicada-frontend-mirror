"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import headerMenuItems from "@/hardcode/headerMenuItems";
import { HeaderMenuItemT } from "@/hardcode/headerMenuItems";

export default function Nav() {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setCurrentPath(pathname);
        setIsMenuOpen(false);
    }, [pathname]);

    const getClassName = (item: HeaderMenuItemT) => {
        const highlight = item.highlight ?? item.href;
        const isActive =
            highlight === "/"
                ? currentPath === highlight
                : currentPath.startsWith(highlight);

        return `cursor-pointer px-3 py-2 m-0 rounded-md text-foreground transition-opacity text-sm md:text-base ${
            isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
        }`;
    };

    return (
        <>
            <nav className="hidden md:flex h-full justify-center items-center gap-0 md:gap-8">
                {headerMenuItems.map((link) => (
                    <Link key={link.href} href={link.href} className={getClassName(link)}>
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="md:hidden flex items-center">
                <button
                    className="flex flex-col justify-between w-8 h-6 bg-transparent focus:outline-none z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
          <span
              className={`block w-full h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "transform rotate-45 translate-y-2.5" : ""
              }`}
          />
                    <span
                        className={`block w-full h-0.5 bg-current transition-all duration-300 ${
                            isMenuOpen ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    <span
                        className={`block w-full h-0.5 bg-current transition-all duration-300 ${
                            isMenuOpen ? "transform -rotate-45 -translate-y-2.5" : ""
                        }`}
                    />
                </button>

                <div
                    className={`fixed top-0 right-0 w-48 h-screen bg-background shadow-xl z-40 transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="mt-16 p-4 flex flex-col items-start gap-2">
                        {headerMenuItems.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-md text-xl ${getClassName(link)}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-15 z-30"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </div>
        </>
    );
}