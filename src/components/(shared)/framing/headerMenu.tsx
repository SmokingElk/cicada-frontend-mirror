"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
	const pathname = usePathname();

	const navLinks = [
		{ href: "/", label: "Главная" },
		{ href: "/cuts", label: "Нарезки" },
		{ href: "/game", label: "Игра" },
		{ href: "/profile", label: "Профиль" },
	];

	const getClassName = (href: string) =>
		`cursor-pointer px-3 py-2 rounded-md ${
			pathname === href || pathname.includes(href)
				? "hover:shadow-sm bg-background text-accent-foreground hover:bg-accent underline"
				: "hover:bg-accent hover:text-accent-foreground"
		}`;

	return (
		<nav className="h-full flex justify-center items-center space-x-8">
			{navLinks.map((link) => (
				<Link key={link.href} href={link.href} className={getClassName(link.href)}>
					{link.label}
				</Link>
			))}
		</nav>
	);
}
