import Wrapper from "@/components/(shared)/common/wrapper";
import LobbyCreate from "@/components/(shared)/lobby/lobbyCreate/lobbyCreate";
import LobbyFilters from "@/components/(shared)/lobby/lobbyFilters/lobbyFilters";
import LobbyList from "@/components/(shared)/lobby/lobbyList/lobbyList";
import LobbySearch from "@/components/(shared)/lobby/lobbySearch/lobbySearch";

export default function LobbyPage() {
  return (
    <Wrapper className="min-w-screen md:w-full h-auto grid sm:grid-rows-2 md:grid-cols-[2fr_1fr] mb-10">
      <div className="min-w-screen md:w-full h-full order-2 md:order-1 flex flex-col md:border-r-[2px] border-foreground">
        <LobbySearch className="h-20 border-b-[2px] border-foreground" />
        <LobbyList className="h-full" />
      </div>
      <div className="max-w-screen-sm md:w-full order-1 md:order-2 flex flex-col box-border pl-[10px] justify-between">
        <LobbyFilters />
        <LobbyCreate />
      </div>
    </Wrapper>
  );
}
