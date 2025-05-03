import {authOptions} from '@/lib/next-auth/nextAuthOptions'
import {getServerSession} from 'next-auth/next'
import {redirect} from 'next/navigation'
import ProfileSettingsPage from '@/components/(shared)/profile/settings/profileSettingsPage'

export default async function Settings() {
	const session = await getServerSession(authOptions)
	if (!session) redirect('/login')
	return <ProfileSettingsPage session={session}/>
}
