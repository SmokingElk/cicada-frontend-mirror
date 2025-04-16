"use client";

import Link from "next/link";
import {Styleable} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function GameNav({className = ""}: Styleable) {
    return (
        <div
            className={cn("w-full flex flex-row md:flex-col justify-end space-x-1 md:space-y-6", className)}
        >
            <Button className="w-1/2 md:w-full h-10 md:h-16" variant="transparrent" size="lg" asChild>
                <Link href="/game">Ничья</Link>
            </Button>

            <Button className="w-1/2 md:w-full h-10 md:h-16" variant="transparrent" size="lg" asChild>
                <Link href="/game">Сдаться</Link>
            </Button>
        </div>
    );
}