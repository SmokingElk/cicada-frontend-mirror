import LobbyPage from '@/components/(shared)/lobby/lobbyPage'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/next-auth/nextAuthOptions'
import { redirect } from 'next/navigation'
import { getAuthAPI } from '@/../external/auth/auth'
import {DocsUser} from "../../../external/auth/auth.schemas";

export default async function Lobby() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const headers = { Authorization: `Bearer ${session.accessToken}` }

  const { data: authMe } = await getAuthAPI().getAuthMe({ headers })
  console.log(authMe.data);

  return <LobbyPage user={authMe.data as DocsUser} accessToken={session.accessToken as string} />
}
