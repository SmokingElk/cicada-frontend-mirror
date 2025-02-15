import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import RhombusDecor from "./rhombusDecor";

interface LineSeparatorProps extends Styleable {
  width?: number; // Ширина в процентах
  direction?: "left" | "right";
}

export default function LineSeparator({
  width = 50,
  direction = "right",
  className = "",
}: LineSeparatorProps) {
  return (
    <div
      className={cn("relative my-8", className)}
      style={{ width: `${width}%` }}
    >
      <div className="border-t-[2px] border-foreground w-full"></div>
      <RhombusDecor
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          direction === "right" ? "right-0" : "left-0"
        )}
      ></RhombusDecor>
    </div>
  );
}
