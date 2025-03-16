import { Styleable } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function LobbyList({ className = "" }: Styleable) {
  return <div className={cn("w-full", className)}></div>;
}
