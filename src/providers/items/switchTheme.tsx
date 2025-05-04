"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import {cn} from "@/lib/utils";

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    icons?: { checked: React.ReactNode; unchecked: React.ReactNode };
    theme?: "light" | "dark";
}

const SwitchTheme = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({className, icons, ...props}, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "relative peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className
        )}
        ref={ref}
        {...props}
    >
        {icons && (
            <>
        <span
            className={cn(
                "absolute left-0 text-xs transition-all duration-200",
                "data-[state=checked]:opacity-100 data-[state=checked]:scale-100",
                "data-[state=unchecked]:opacity-0 data-[state=unchecked]:scale-0"
            )}
        >
          {icons.checked}
        </span>
                <span
                    className={cn(
                        "absolute right-0 text-xs transition-all duration-200",
                        "data-[state=unchecked]:opacity-100 data-[state=unchecked]:scale-100",
                        "data-[state=checked]:opacity-0 data-[state=checked]:scale-0"
                    )}
                >
          {icons.unchecked}
        </span>
            </>
        )}
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-2xl ring-0 transition-transform",
                "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )}
        />
    </SwitchPrimitives.Root>
));
SwitchTheme.displayName = SwitchPrimitives.Root.displayName;

export {SwitchTheme};
