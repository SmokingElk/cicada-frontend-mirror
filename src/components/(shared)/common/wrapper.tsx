import { cn } from "@/lib/utils";
import { Styleable, WithChildren } from "@/lib/types";

interface WrapperProps extends Styleable, WithChildren {}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={cn(
        "max-w-screen-xl px-8 sm:px-10 lg:px-16 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
