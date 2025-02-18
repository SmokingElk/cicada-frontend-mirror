import Wrapper from "@/components/(shared)/common/wrapper";
import ProfileMenu from "@/components/(shared)/profile/menu/profileMenu";
import ProfileInfo from "@/components/(shared)/profile/info/profileInfo";

export default function ProfileInfoPage() {
  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileInfo />
    </Wrapper>
  );
}
