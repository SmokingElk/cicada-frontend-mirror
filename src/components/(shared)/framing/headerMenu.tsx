'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { HeaderMenuItem } from "@/hardcode/headerMenuItems";
import headerMenuItems from '@/hardcode/headerMenuItems';

export default function Nav() {
	const pathname = usePathname();
	const [currentPath, setCurrentPath] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { data: session, status } = useSession();

	useEffect(() => {
		setCurrentPath(pathname);
		setIsMenuOpen(false);
	}, [pathname]);

	if (status === 'loading') return null;

	const isAuth = status === 'authenticated';

	const filteredItems = headerMenuItems.filter((i) =>
		i.visibility === 'auth' ? isAuth
			: i.visibility === 'guest' ? !isAuth
				: true
	);

	const getClassName = (item: HeaderMenuItem) => {
		const highlight = item.highlight ?? item.href;
		if (!highlight) return "opacity-50 hover:opacity-100"; // для кнопок без href

		const isActive =
			highlight === "/"
				? currentPath === highlight
				: currentPath.startsWith(highlight);

		return `cursor-pointer px-3 py-2 m-0 rounded-md text-foreground transition-opacity text-sm md:text-base ${
			isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
		}`;
	};

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden md:flex h-full items-center gap-8">
				{filteredItems.map((i) =>
					i.action === 'logout' ? (
						<button
							key={i.label}
							onClick={() => signOut({ callbackUrl: '/login' })}
							className="opacity-50 hover:opacity-100 transition-opacity"
						>
							{i.label}
						</button>
					) : (
						<Link
							key={i.href ?? i.label}
							href={i.href!}
							className={getClassName(i)}
						>
							{i.label}
						</Link>
					)
				)}
			</nav>

			{/* Mobile Burger Menu */}
			<div className="md:hidden flex items-center">
				<button
					className="flex flex-col justify-between w-8 h-6 bg-transparent focus:outline-none z-50"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
          <span
			  className={`block w-full h-0.5 bg-current transition-all duration-300 ${
				  isMenuOpen ? "transform rotate-45 translate-y-2.5" : ""
			  }`}
		  />
					<span
						className={`block w-full h-0.5 bg-current transition-all duration-300 ${
							isMenuOpen ? "opacity-0" : "opacity-100"
						}`}
					/>
					<span
						className={`block w-full h-0.5 bg-current transition-all duration-300 ${
							isMenuOpen ? "transform -rotate-45 -translate-y-2.5" : ""
						}`}
					/>
				</button>

				{/* Mobile Menu Panel */}
				<div
					className={`fixed top-0 right-0 w-48 h-screen bg-background shadow-xl z-40 transition-transform duration-300 ease-in-out ${
						isMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="mt-16 p-4 flex flex-col items-start gap-2">
						{filteredItems.map((item) =>
							item.action === 'logout' ? (
								<button
									key={item.label}
									onClick={() => {
										setIsMenuOpen(false);
										signOut({ callbackUrl: '/login' });
									}}
									className="block px-4 py-3 rounded-md text-xl opacity-50 hover:opacity-100"
								>
									{item.label}
								</button>
							) : (
								<Link
									key={item.href ?? item.label}
									href={item.href!}
									className={`block px-4 py-3 rounded-md text-xl ${getClassName(item)}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							)
						)}
					</div>
				</div>

				{/* Overlay */}
				{isMenuOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-15 z-30"
						onClick={() => setIsMenuOpen(false)}
					/>
				)}
			</div>
		</>
	);
}