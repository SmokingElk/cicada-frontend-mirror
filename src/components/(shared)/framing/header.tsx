"use client";

import Image from "next/image"
import logo from "@/../public/logo.svg"
import Wrapper from "@/components/(shared)/common/wrapper"

import HeaderMenu from "@/components/(shared)/framing/headerMenu";
import {useTheme} from "next-themes";


export default function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 h-[var(--header-height)] z-40 w-full bg-background">
			<Wrapper className="flex flex-row items-center justify-between py-4">
				<div className="flex items-center">
					<Image className="fg-foreground h-1/3 md:h-auto" src={logo} alt="Logo" width={40} height={36}/>
					<h1 className="text-2xl ml-5 font-bold">Cicada Chess</h1>
				</div>
				<HeaderMenu/>
			</Wrapper>
		</header>
	);

}