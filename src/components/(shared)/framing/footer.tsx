import Wrapper from "@/components/(shared)/common/wrapper";
import Link from "next/link";
import VKIcon from "@/../public/vk.svg";
import TGIcon from "@/../public/tg.svg";

export default function Footer() {
	return (
		<footer className="bg-[#232326]">
			<Wrapper className="flex flex-row items-center justify-between py-7">
				<div className="flex items-center">
					<Link href={"/"} className="text-lg text-[#DEDAD7]">
						Политика конфиденциальности
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<Link href={"/"}>
						<img src={TGIcon.src} alt="TG" className="h-6 w-6" />
					</Link>
					<Link href={"/"}>
						<img src={VKIcon.src} alt="VK" className="h-6 w-6" />
					</Link>
				</div>
			</Wrapper>
		</footer>
	);
}
