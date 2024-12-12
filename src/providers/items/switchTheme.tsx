"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	icons?: {
		checked: React.ReactNode;
		unchecked: React.ReactNode;
	};
}

const SwitchTheme = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(({ className, icons, ...props }, ref) => (
	<SwitchPrimitives.Root
		ref={ref}
		className={cn(
			"relative peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"disabled:cursor-not-allowed disabled:opacity-50",
			// Светлая тема (unchecked)
			"data-[state=unchecked]:bg-gray-200",
			// Тёмная тема (checked) — изменён цвет на более яркий для контраста
			"data-[state=checked]:bg-yellow-500", // Изменено с bg-gray-700 на bg-blue-600
			className
		)}
		{...props}
	>
		{icons && (
			<>
				<span
					className={cn(
						"pointer-events-none absolute left-0 text-xs transition-opacity text-white",
						"data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
					)}
				>
					{icons.checked}
				</span>
				<span
					className={cn(
						"pointer-events-none absolute right-0 text-xs transition-opacity text-black",
						"data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-100"
					)}
				>
					{icons.unchecked}
				</span>
			</>
		)}
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
				"border border-gray-300",
				"data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
				"data-[state=checked]:bg-white data-[state=checked]:border-white-300"
			)}
		/>
	</SwitchPrimitives.Root>
))
SwitchTheme.displayName = SwitchPrimitives.Root.displayName

export { SwitchTheme }
