import Wrapper from "@/components/(shared)/common/wrapper";
import LobbyRating from "@/components/(shared)/lobby/lobbyRating/lobbyRating";
import LobbyCreate from "@/components/(shared)/lobby/lobbyCreate/lobbyCreate";
import { Button } from "@/components/ui/button";
import Chessboard from "@/../public/images/chessboard.svg";
import Image from "next/image";

export default function LobbyPage() {
    return (
        <Wrapper className="min-w-screen md:w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 md:pt-12">
            <div className="hidden md:flex flex-col items-center p-4 md:pt-40">
                <Image
                        className="w-full h-[400px]"
                        src={Chessboard}
                        alt="grid"
                        objectFit="contain"
                    />
            </div>

            <div className="flex flex-col items-center gap-8 p-4 pt-3 md:justify-start md:pt-48">
                <LobbyRating/>
                <Button className="h-16 text-2xl px-8 w-full max-w-xs" variant="transparrent">
                    Поиск соперника
                </Button>
                <LobbyCreate/>
            </div>


        </Wrapper>
    );
}