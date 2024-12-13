import { cn } from "@/lib/utils";

interface LandingCardProps {
	title: string,
	description: string,
	className?: string,
}

export default function LandingCard({title, description, className}: LandingCardProps) {
	return (
		<div className={cn("mb-5", className)}>
			<h2 className="text-3xl font-semibold mb-2.5">{title}</h2>
			<div className="text-xl">{description}</div>
		</div>
	)
}