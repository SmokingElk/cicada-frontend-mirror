"use client";

import Link from "next/link";
import {Styleable} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function GameNav({className = ""}: Styleable) {
    return (
        <div
            className={cn("w-full flex flex-col justify-end space-y-6", className)}
        >
            <Button className="w-full h-16" variant="transparrent" size="xl" asChild>
                <Link href="/game">Ничья</Link>
            </Button>

            <Button className="w-full h-16" variant="transparrent" size="xl" asChild>
                <Link href="/game">Сдаться</Link>
            </Button>
        </div>
    );
}
