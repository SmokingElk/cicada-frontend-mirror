'use client'

import { useEffect, useState } from 'react'
import type { RawAxiosRequestHeaders } from 'axios'

import Wrapper from '@/components/(shared)/common/wrapper'
import ProfileMenu from '@/components/(shared)/profile/menu/profileMenu'
import ProfileInfo from '@/components/(shared)/profile/info/profileInfo'

import { getUserAPI, type GetProfileResult } from '../../../../../external/users/users'
import type { Session } from 'next-auth'

interface ProfileInfoPageProps {
  session: Session
}

export default function ProfileInfoPage({ session }: ProfileInfoPageProps) {
  const [profile, setProfile] = useState<GetProfileResult['data'] | null>(null)

  async function getUserProfile() {
    if (!session.accessToken) return console.error('нет accessToken в session')

    const { data } = await getUserAPI().getProfile({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      } as RawAxiosRequestHeaders,
    })

    setProfile(data)
  }

  useEffect(() => {
    void getUserProfile()
  }, [])

  return (
    <Wrapper className="min-h-screen">
      <ProfileMenu className="mb-[90px]" />
      <ProfileInfo profile={profile} />
    </Wrapper>
  )
}
