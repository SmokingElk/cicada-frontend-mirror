'use client'

import {useEffect, useState} from 'react'
import Wrapper from '@/components/(shared)/common/wrapper'
import ProfileMenu from '@/components/(shared)/profile/menu/profileMenu'
import ProfileSettingsContent from '@/components/(shared)/profile/settings/profileSettingsContent'

import {
	getUserAPI,
	type GetProfileResult,
	type GetUsersIdResult,
} from '../../../../../external/users/users'

import type {Session} from 'next-auth'
import type {RawAxiosRequestHeaders} from 'axios'

interface Props {
	session: Session
}

export default function ProfileSettingsPage({session}: Props) {
	const [profile, setProfile] = useState<GetProfileResult['data'] | null>(null)
	const [userInfo, setUserInfo] = useState<GetUsersIdResult['data'] | null>(null)

	useEffect(() => {
		if (!session.accessToken) return

		const headers = {
			Authorization: `Bearer ${session.accessToken}`,
		} as RawAxiosRequestHeaders

		getUserAPI()
			.getProfile({headers})
			.then(({data: profileData}) => {
				setProfile(profileData)

				const userId = profileData.data?.user_id
				if (!userId) return

				return getUserAPI().getUsersId(userId, {headers})
			})
			.then((resp) => {
				if (resp) setUserInfo(resp.data)
			})
	}, [session.accessToken])

	return (
		<Wrapper className="min-h-screen">
			<ProfileMenu className="mb-[90px]"/>
			<ProfileSettingsContent
				session={session}
				profile={profile}
				userInfo={userInfo}
			/>
		</Wrapper>
	)
}
