import Image from "next/image"
import logo from "@/../public/logo.svg"

import HeaderMenu from "@/components/(shared)/framing/headerMenu";

export default function Header() {
	return (
		<header
			className="fixed top-0 left-0 right-0 h-[var(--header-height)] mx-auto z-40 max-w-screen-xl bg-background px-9 pt-9 flex flex-row items-center justify-between">
			<div className="flex items-center py-3">
				<Image src={logo} alt="Logo" width={40} height={36} className=""/>
				<h1 className="text-2xl ml-5 font-bold">
					Cicada Chess
				</h1>
			</div>
			<HeaderMenu/>
		</header>
	)
}