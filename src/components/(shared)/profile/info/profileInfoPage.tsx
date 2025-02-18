import Wrapper from "../../common/wrapper";
import ProfileMenu from "../menu/profileMenu";
import ProfileInfo from "./profileInfo";

export default function ProfileInfoPage() {
  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileInfo />
    </Wrapper>
  );
}
