import type { Metadata } from "next";

import { Montserrat_Alternates, Roboto } from "next/font/google";
import "./globals.css";
import AggregateProvider from "@/providers/aggregateProvider"
import Header from "@/components/(shared)/framing/header";
import ThemeToggle from "@/providers/items/themeToggle";

const montserrat = Montserrat_Alternates({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Cicada Chess",
};

export default function RootLayout({
																		 children,
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
		<body className={`antialiased ${montserrat.className} ${roboto.className}`}>
		<AggregateProvider>
			<div className="max-w-screen-xl mx-auto px-4">
				<Header/>
				{children}
			</div>
			<div className="fixed right-20 bottom-4 z-50">
				<ThemeToggle/>
			</div>
		</AggregateProvider>
		</body>
		</html>
	);
}
