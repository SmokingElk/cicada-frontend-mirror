"use client";

import Wrapper from "@/components/(shared)/common/wrapper";
import Link from "next/link";
import VKIconLight from "../../../../public/vkLight.svg";
import TGIconLight from "../../../../public/tgLight.svg";
import VKIconDark from "@/../public/vkDark.svg";
import TGIconDark from "@/../public/tgDark.svg";
import {useTheme} from "next-themes";

export default function Footer() {
    const {theme, setTheme} = useTheme();
    const VKIcon = theme === "dark" ? VKIconDark : VKIconLight;
    const TGIcon = theme === "dark" ? TGIconDark : TGIconLight;
    return (
        <footer className="bg-foreground">
            <Wrapper className="flex flex-row items-center justify-between py-7">
                <div className="flex items-center">
                    <Link href={"/"} className="text-lg text-background">
                        Политика конфиденциальности
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href={"/"}>
                        <img src={VKIcon.src} alt="VK" className="h-6 w-6"/>
                    </Link>
                    <Link href={"/"}>
                        <img src={TGIcon.src} alt="TG" className="h-6 w-6"/>
                    </Link>
                </div>
            </Wrapper>
        </footer>
    );
}
