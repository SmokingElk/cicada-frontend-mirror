import { cn } from "@/lib/utils";
import { Styleable, WithChildren } from "@/lib/types";

interface WrapperProps extends Styleable, WithChildren {}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={cn(
        "px-3 w-screen md:max-w-screen-md md:px-10 lg:max-w-screen-lg lg:px-16 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
