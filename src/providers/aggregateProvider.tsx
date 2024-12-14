"use client"
import { useEffect, useState } from "react";

import { Toaster as Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"
import { ThemeProvider } from "./items/themeProvider";
import React from "react";

export default function AggregateProvider({children}: { children: React.ReactNode }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
			{children}
			<Toaster/>
			<Sonner/>
		</ThemeProvider>
	)
}