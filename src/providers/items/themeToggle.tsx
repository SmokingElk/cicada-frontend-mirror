"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {SwitchTheme} from "@/providers/items/switchTheme";

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    // Убедимся, что компонент отрендерился на клиенте
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <div className="flex items-center space-x-2">
            <SwitchTheme
                id="theme-toggle"
                checked={isDark}
                onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
                icons={{
                    checked: "🌙",
                    unchecked: "☀️",
                }}
            />
        </div>
    );
}
