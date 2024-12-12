import Image from "next/image"
import logo from "@/../public/logo.svg"

export default function Header() {
	return (
		<header className="fixed max-w-screen-xl mx-auto z-40 bg-[#dedad7] pt-9 flex flex-row items-center justify-between px-9 left-0 right-0">
			<div className="flex items-center py-3">
				<Image src={logo} alt="Logo" width={40} height={36} className=""/>
				<h1 className="text-2xl ml-5 font-bold">
					Cicada Chess
				</h1>
      </div>
			<nav className="h-full flex justify-center items-center space-x-8">
				<a>Главная</a>
				<a>Нарезки</a>
				<a>Игра</a>
				<a>Профиль</a>
			</nav>
		</header>
	)
}