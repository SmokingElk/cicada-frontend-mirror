import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";
import PointSeparator from "../../common/pointSeparator";
import RhombusDecor from "../../common/rhombusDecor";

export default function GameSidebar({ className = "" }: Styleable) {
  const moves = [
    { piece: "пешка", from: "E2", to: "E4" },
    { piece: "пешка", from: "E7", to: "E5" },
    { piece: "конь", from: "B1", to: "C3" },
    { piece: "король", from: "E1", to: "E2" },
  ];

  return (
    <div className={cn("w-full h-full", className)}>
      <div className="flex h-full overflow-y-auto border-box">
        <div className="flex gap-5 flex-col w-1/5 border-r-2 border-foreground">
          {moves.map((e, index) => (
            <div
              key={`move_indicator_${index}`}
              className="flex w-4 h-4 justify-center items-center"
            >
              <RhombusDecor
                className={cn(
                  index % 2 === 0 ? "bg-background" : "bg-foreground",
                  "border-2 border-primary"
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-2/5 border-r-2 border-foreground">
          {moves.map((e, index) => (
            <div
              key={`move_piece_${index}`}
              className="text-foreground font-roboto text-base h-4 flex items-center box-border pl-2"
            >
              {e.piece}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-1/5 border-r-2 border-foreground">
          {moves.map((e, index) => (
            <div
              key={`move_from_${index}`}
              className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
            >
              {e.from}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-1/5 border-r-2 border-foreground">
          {moves.map((e, index) => (
            <div
              key={`move_to_${index}`}
              className="text-foreground font-roboto text-base h-4 flex justify-center items-center"
            >
              {e.to}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
