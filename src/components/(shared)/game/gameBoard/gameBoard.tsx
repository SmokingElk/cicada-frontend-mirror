"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Styleable } from "@/lib/types";
import { useTheme } from "next-themes"
import GameRenderer from "@/graphics/gameRenderer/GameRenderer";

type ThemeType = 'light' | 'dark' | undefined;

export default function GameBoard({ className = "" }: Styleable) {
  const { theme } = useTheme();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasSizeRef = useRef(canvasSize);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRenderer] = useState(new GameRenderer());
  const themeRef = useRef<ThemeType>(theme === 'light' || theme === 'dark' ? theme : undefined);

  const pieces = [
    { col: "a", row: "2", white: true },
    { col: "b", row: "2", white: true },
    { col: "a", row: "7", white: false },
    { col: "b", row: "7", white: false },
  ];

  useEffect(() => {
    themeRef.current = theme === 'light' || theme === 'dark' ? theme : undefined;
  }, [theme]);

  const updateCanvasSize = () => {
    if (wrapperRef.current == null) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    setCanvasSize({
      width: Math.floor(wrapperRect.width),
      height: Math.floor(wrapperRect.height),
    });
  };

  useEffect(updateCanvasSize, [wrapperRef.current]);

  useEffect(() => {
    if (canvasRef.current == null) return;
    setCtx(canvasRef.current.getContext("2d"));
  }, [canvasRef.current]);

  useEffect(() => {
    canvasSizeRef.current = canvasSize;
  }, [canvasSize]);

  useEffect(() => {
    if (ctx === null) return;
    setIsRendering(true);

    let requestId: number;

    const render = () => {
      try {
        const canvasSize = canvasSizeRef.current;
        gameRenderer.render({
          ctx,
          width: canvasSize.width,
          height: canvasSize.height,
          pieces,
          theme: themeRef.current,
        });

        requestId = requestAnimationFrame(render);
      } catch (error) {
        cancelAnimationFrame(requestId);
        throw error;
      }
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [ctx, gameRenderer]);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    if (ctx && isRendering) {
      const canvasSize = canvasSizeRef.current;
      gameRenderer.render({
        ctx,
        width: canvasSize.width,
        height: canvasSize.height,
        pieces,
        theme: themeRef.current,
      });
    }
  }, [theme, ctx, isRendering, gameRenderer]);

  return (
      <div ref={wrapperRef} className={cn("w-full max-w-full aspect-square", className)}>
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            width={canvasSize.width}
            height={canvasSize.height}
        ></canvas>
      </div>
  );
}