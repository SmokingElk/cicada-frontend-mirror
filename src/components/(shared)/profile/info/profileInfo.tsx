'use client'

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { cn, normalizeUrl } from '@/lib/utils'
import LineSeparator from '@/components/(shared)/common/lineSeparator'
import AvatarPlaceholder from '@/../public/avatars/avatarPlaceholder.png'
import type { GetProfileResult } from '../../../../../external/users/users'

interface ProfileInfoProps {
  profile: GetProfileResult['data'] | null
}

interface ViewState {
  username: string
  age: number | null
  city: string
  description: string
  avatar: string | StaticImageData
}

export default function ProfileInfoContent({ profile }: ProfileInfoProps) {
  const [view, setView] = useState<ViewState>({
    username: '',
    age: null,
    city: '',
    description: '',
    avatar: AvatarPlaceholder,
  })

  useEffect(() => {
    if (!profile?.data) return
    const p = profile.data
    setView({
      username: p.username ?? 'Username',
      age: p.age ?? null,
      city: p.location ?? '',
      description: p.description ?? '',
      avatar: p.avatar_url ? normalizeUrl(p.avatar_url) : AvatarPlaceholder,
    })
  }, [profile])

  const ageText =
    view.age === null || view.age === -1 ? 'Возраст не указан' : `${view.age} лет`
  const cityText = view.city || 'Город не указан'

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 justify-stretch">
      <div className="w-full">
        <p className="font-montserrat text-foreground text-2xl md:text-4xl font-semibold h-[70px]">
          {view.username || 'Никнейм'}
        </p>
        <LineSeparator width={100} className="mt-0 mb-9" />

        <div className="w-full text-xl text-foreground font-roboto mb-14">
          {cityText}, {ageText}
        </div>

        <div className="font-montserrat text-foreground text-2xl font-semibold mb-5">
          Описание:
        </div>

        <p
          className={cn(
            'border-[2px] border-foreground w-full min-h-[260px] p-4 box-border',
            'font-main text-xl text-foreground mb-5 '
          )}
        >
          {view.description || 'Коротко обо мне...'}
        </p>
      </div>

      <div className="self-center md:self-start">
        <div className="relative w-[320px] h-[320px]">
          <Image
            src={view.avatar}
            fill
            alt="avatar"
            className="rounded-full object-cover"
          />
        </div>
      </div>

    </div>
  )
}
