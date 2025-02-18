import Wrapper from "@/components/(shared)/common/wrapper";
import ProfileMenu from "@/components/(shared)/profile/menu/profileMenu";
import ProfileStats from "@/components/(shared)/profile/stats/profileStats";

export default function ProfileStatsPage() {
  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileStats />
    </Wrapper>
  );
}
