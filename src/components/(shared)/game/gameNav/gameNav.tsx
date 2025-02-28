"use client";

import { Styleable } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/(shared)/common/wrapper";
import { ReactNode } from "react";

export default function GameNav({ className = "" }: Styleable) {
  return (
        <div className="w-full flex flex-col justify-end space-y-6">
            <Button className="w-full h-16" variant="transparrent" size="xl" asChild>
              <Link href="/game">Ничья</Link>
            </Button>
            <Button className="w-full h-16" variant="transparrent" size="xl" asChild>
                <Link href="/game">Сдаться</Link>
            </Button>
        </div>
  );
}
