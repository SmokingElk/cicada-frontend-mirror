"use client";

import React, {useEffect, useState} from "react";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "./items/themeProvider";

import {Toaster as Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";

export default function AggregateProvider({children,}: {
	children: React.ReactNode;
}) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;         // избегаем гидратации в SSR


	return (
		<SessionProvider refetchInterval={4 * 60}>
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
				{children}
				<Toaster/>
				<Sonner/>
			</ThemeProvider>
		</SessionProvider>
	);
}
