import Wrapper from "../common/wrapper";
import ProfileMenu from "./profileMenu";
import ProfileInfo from "./profileInfo";

export default function ProfilePage() {
  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileInfo />
    </Wrapper>
  );
}
