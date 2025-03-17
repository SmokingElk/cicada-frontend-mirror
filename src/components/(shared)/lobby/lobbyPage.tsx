import Wrapper from "@/components/(shared)/common/wrapper";
import LobbyCreate from "@/components/(shared)/lobby/lobbyCreate/lobbyCreate";
import LobbyFilters from "@/components/(shared)/lobby/lobbyFilters/lobbyFilters";
import LobbyList from "@/components/(shared)/lobby/lobbyList/lobbyList";
import LobbySearch from "@/components/(shared)/lobby/lobbySearch/lobbySearch";

export default function LobbyPage() {
  return (
    <Wrapper className="w-full h-auto grid grid-cols-[2fr_1fr] mb-10">
      <div className="w-full h-full flex flex-col border-r-[2px] border-foreground">
        <LobbySearch className="h-20 border-b-[2px] border-foreground" />
        <LobbyList className="h-full" />
      </div>
      <div className="w-full flex flex-col box-border pl-[10px] gap-10 justify-between">
        <LobbyFilters />
        <LobbyCreate />
      </div>
    </Wrapper>
  );
}
