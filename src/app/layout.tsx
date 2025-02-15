import type { Metadata } from "next";

import { Montserrat_Alternates, Roboto } from "next/font/google";
import "./globals.css";
import AggregateProvider from "@/providers/aggregateProvider"
import Header from "@/components/(shared)/framing/header";
import ThemeToggle from "@/providers/items/themeToggle";
import Footer from "@/components/(shared)/framing/footer";

const montserrat = Montserrat_Alternates({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-heading"
});

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-main"
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
				<Header/>
				{children}
				<Footer />
			<div className="fixed right-20 bottom-4 z-50">
				<ThemeToggle/>
			</div>
		</AggregateProvider>
		</body>
		</html>
	);
}
