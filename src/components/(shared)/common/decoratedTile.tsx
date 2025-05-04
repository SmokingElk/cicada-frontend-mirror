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
      <div className="w-full">{children}</div>
      <div className="h-full md:aspect-square hidden md:flex justify-center items-center">
        <RhombusDecor className="flex bg-background" />
      </div>
    </div>
  );
}
