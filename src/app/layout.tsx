import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/(shared)/framing/header";

const montserrat = Montserrat({
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
		<html lang="ru" className={`${montserrat.className} ${roboto.className}`}>
		<body
			className="antialiased bg-[#dedad7]"
		>
		<div className="max-w-screen-xl mx-auto px-4">
			<Header/>
			{children}
		</div>
		</body>
		</html>
	);
}
