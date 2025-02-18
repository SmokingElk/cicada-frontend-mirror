import { Styleable, WithChildren } from "@/lib/types";
import RhombusDecor from "./rhombusDecor";
import { cn } from "@/lib/utils";

interface DecoratedTileProps extends Styleable, WithChildren {}

export default function DecoratedTile({
  className = "",
  children,
}: DecoratedTileProps) {
  return (
    <div className={cn("flex bg-foreground justify-between", className)}>
      <div>{children}</div>
      <div className="h-full aspect-square flex justify-center items-center">
        <RhombusDecor className="bg-background" />
      </div>
    </div>
  );
}
