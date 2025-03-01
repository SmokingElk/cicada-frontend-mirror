"use client";

import GameRenderer from "@/graphics/gameRenderer/GameRenderer";
import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function GameBoard({ className = "" }: Styleable) {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasSizeRef = useRef(canvasSize);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRenderer] = useState(new GameRenderer());

  const picies = [
    { col: "a", row: "2", white: true },
    { col: "b", row: "2", white: true },
    { col: "a", row: "7", white: false },
    { col: "b", row: "7", white: false },
  ];

  const updateCanvasSize = () => {
    if (wrapperRef.current == null) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    setCanvasSize({ width: wrapperRect.width, height: wrapperRect.height });
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
    if (ctx === null || isRendering) return;
    setIsRendering(true);

    let requestId: number;

    const render = () => {
      try {
        const canvasSize = canvasSizeRef.current;
        gameRenderer.render({
          ctx,
          width: canvasSize.width,
          height: canvasSize.height,
          picies,
        });

        requestId = requestAnimationFrame(render);
      } catch (error) {
        cancelAnimationFrame(requestId);
        throw error;
      }
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [ctx]);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <div ref={wrapperRef} className={cn("w-full aspect-square", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </div>
  );
}
