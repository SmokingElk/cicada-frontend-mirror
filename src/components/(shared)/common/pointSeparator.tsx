import { Styleable } from "@/lib/types";
import RhombusDecor from "./rhombusDecor";
import { cn } from "@/lib/utils";

interface PointSeparatorProps extends Styleable {
  width?: number | "full";
  height?: number | "full";
}

export default function PointSeparator({
  width = 4,
  height = 4,
  className = "",
}: PointSeparatorProps) {
  return (
    <div
      className={cn(
        `flex items-center justify-center w-${width} h-${height}`,
        className
      )}
    >
      <RhombusDecor />
    </div>
  );
}
