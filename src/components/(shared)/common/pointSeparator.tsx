import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

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
