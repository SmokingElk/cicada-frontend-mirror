import {authOptions} from "@/lib/next-auth/nextAuthOptions";

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import ProfileInfoPage from "@/components/(shared)/profile/info/profileInfoPage";

export default async function Profile() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  console.log(session);

  return <ProfileInfoPage session={session} />;
}
