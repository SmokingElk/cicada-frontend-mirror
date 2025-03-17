import { Styleable, WithChildren } from "@/lib/types";
import { cn } from "@/lib/utils";
import RhombusDecor from "@/components/(shared)/common/rhombusDecor";

interface DecoratedTileProps extends Styleable, WithChildren {}

export default function DecoratedTile({
  className = "",
  children,
}: DecoratedTileProps) {
  return (
    <div className={cn("flex bg-foreground justify-between h-20", className)}>
      <div>{children}</div>
      <div className="h-full aspect-square flex justify-center items-center">
        <RhombusDecor className="bg-background" />
      </div>
    </div>
  );
}
