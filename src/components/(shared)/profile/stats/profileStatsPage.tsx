import Wrapper from "../../common/wrapper";
import ProfileMenu from "../menu/profileMenu";
import ProfileStats from "./profileStats";

export default function ProfileStatsPage() {
  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileStats />
    </Wrapper>
  );
}
