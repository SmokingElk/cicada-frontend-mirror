"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const SliderDouble = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[2px] w-full grow rounded-full bg-foreground flex items-center">
      <SliderPrimitive.Range className="absolute h-5 bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-0 relative outline-none overflow-visible disabled:pointer-events-none disabled:opacity-50">
      <div className="bg-foreground absolute -left-2 w-4 h-4 clip-path-triangle scale-x-[1.5] scale-y-[2]"></div>
    </SliderPrimitive.Thumb>
    <SliderPrimitive.Thumb className="block h-4 w-0 relative outline-none overflow-visible disabled:pointer-events-none disabled:opacity-50">
      <div className="bg-foreground absolute -left-2 w-4 h-4 clip-path-triangle scale-x-[-1.5] scale-y-[2]"></div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
SliderDouble.displayName = SliderPrimitive.Root.displayName;

export { SliderDouble };
