import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RhombusDecorProps extends Styleable {
  size?: number;
}

export default function RhombusDecor({
  size = 4,
  className = "",
}: RhombusDecorProps) {
  return (
    <div
      className={cn(`size-${size} rotate-45 bg-foreground`, className)}
    ></div>
  );
}
