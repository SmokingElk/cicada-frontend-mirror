import { cn } from "@/lib/utils";

interface CustomSeparatorProps {
	width?: number; // Ширина в процентах
	direction?: "left" | "right";
	className?: string;
}

export default function CustomSeparator({
																					width = 50,
																					direction = "right",
																					className = "",
																				}: CustomSeparatorProps) {
	return (
		<div
			className={cn("relative", className)}
			style={{ width: `${width}%` }}
		>
			<div className="border-t border-gray-800 w-full"></div>
			<div
				className={cn(
					"absolute top-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-gray-800",
					direction === "right" ? "right-0" : "left-0"
				)}
			></div>
		</div>
	);
}
