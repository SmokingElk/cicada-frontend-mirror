'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import AvatarPlaceholder from '@/../public/avatars/avatarPlaceholder.png'
import LineSeparator from '@/components/(shared)/common/lineSeparator'
import { cn, normalizeUrl } from '@/lib/utils'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogFooter,
	DialogHeader,
	DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getUserAPI } from '@/../api/users/users'
import type { GetProfileResult, GetUsersIdResult } from '@/../api/users/users'
import type { Session } from 'next-auth'
import type { RawAxiosRequestHeaders } from 'axios'

interface FormState {
	city: string
	age: number | null
	description: string
}

interface Props {
	session: Session
	profile: GetProfileResult['data'] | null
	userInfo: GetUsersIdResult['data'] | null
}

const pwdSchema = z
	.object({
		oldPass: z.string().min(6),
		newPass: z.string().min(6),
		repeat: z.string(),
	})
	.refine((d) => d.newPass === d.repeat, { path: ['repeat'] })

type PwdValues = z.infer<typeof pwdSchema>

export default function ProfileSettingsContent({
																								 session,
																								 profile,
																								 userInfo,
																							 }: Props) {
	const [form, setForm] = useState<FormState>({
		city: '',
		age: null,
		description: '',
	})
	const [avatar, setAvatar] = useState<string | StaticImageData>(AvatarPlaceholder)
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [saving, setSaving] = useState(false)
	const fileRef = useRef<HTMLInputElement>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<PwdValues>({ resolver: zodResolver(pwdSchema) })

	useEffect(() => {
		if (!profile?.data || !userInfo?.data) return
		const p = profile.data
		setForm({
			city: p.location ?? '',
			age: p.age ?? null,
			description: p.description ?? '',
		})
		setAvatar(p.avatar_url ? normalizeUrl(p.avatar_url) : AvatarPlaceholder)
	}, [profile, userInfo])

	const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
		setForm((f) => ({ ...f, [k]: v }))

	const saveProfile = async () => {
		if (!session.accessToken || !profile?.data) return
		const uid = profile.data.user_id
		if (!uid) return
		const headers = { Authorization: `Bearer ${session.accessToken}` } as RawAxiosRequestHeaders
		const t = toast.loading('Сохраняем…')
		setSaving(true)
		try {
			await Promise.all([
				getUserAPI().patchProfile(
					{ age: form.age ?? undefined, location: form.city, description: form.description },
					{ headers }
				),
				avatarFile
					? getUserAPI().postProfileAvatar({ avatar: avatarFile }, { headers })
					: Promise.resolve(),
			])
			toast.success('Профиль обновлён', { id: t })
			setAvatarFile(null)
		} catch {
			toast.error('Не удалось сохранить', { id: t })
		} finally {
			setSaving(false)
		}
	}

	const changePassword = async (v: PwdValues) => {
		if (!session.accessToken || !profile?.data) return
		const uid = profile.data.user_id
		if (!uid) return
		const headers = { Authorization: `Bearer ${session.accessToken}` } as RawAxiosRequestHeaders
		const t = toast.loading('Обновляем пароль…')
		try {
			await getUserAPI().postUsersIdChangePassword(
				uid,
				{ old_password: v.oldPass, new_password: v.newPass },
				{ headers }
			)
			toast.success('Пароль изменён', { id: t })
			reset()
		} catch {
			toast.error('Не удалось изменить пароль', { id: t })
		}
	}

	return (
		<div className="flex flex-col gap-12 md:flex-row md:gap-20">
			<div className="mb-8 flex-1 max-w-xl space-y-10">
				<p className="text-4xl md:text-xl font-semibold">
					{profile?.data?.username ?? 'username'}
				</p>

				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-1 col-span-2 sm:col-span-1">
						<Label className="opacity-70 text-sm">Город</Label>
						<Input
							value={form.city}
							onChange={(e) => update('city', e.target.value)}
							placeholder="Город"
							className="text-lg py-2"
						/>
					</div>
					<div className="space-y-1 col-span-2 sm:col-span-1">
						<Label className="opacity-70 text-sm">Возраст</Label>
						<Input
							type="number"
							value={form.age ?? ''}
							onChange={(e) => update('age', e.target.value ? +e.target.value : null)}
							placeholder="Возраст"
							className="text-lg py-2"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-lg font-semibold">Описание</Label>
					<textarea
						className={cn(
							'w-full min-h-[160px] bg-transparent outline-none border-2 rounded-md text-lg',
							'border-foreground/50 p-4 focus:border-foreground resize-none'
						)}
						placeholder="Коротко обо мне…"
						value={form.description}
						onChange={(e) => update('description', e.target.value)}
					/>
				</div>

				<LineSeparator width={100} />

				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-fit mr-10 text-lg">Сменить пароль</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[420px] p-6">
						<DialogHeader>
							<DialogTitle className="text-xl">Новый пароль</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit(changePassword)} className="space-y-6 mt-4">
							<div className="space-y-1">
								<Label className="opacity-70 text-sm">Текущий пароль</Label>
								<Input
									type="password"
									{...register('oldPass')}
									placeholder="••••••"
									className="text-base py-2"
								/>
								{errors.oldPass && <p className="text-sm text-red-500">{errors.oldPass.message}</p>}
							</div>

							<div className="space-y-1">
								<Label className="opacity-70 text-sm">Новый пароль</Label>
								<Input
									type="password"
									{...register('newPass')}
									placeholder="••••••"
									className="text-base py-2"
								/>
								{errors.newPass && <p className="text-sm text-red-500">{errors.newPass.message}</p>}
							</div>

							<div className="space-y-1">
								<Label className="opacity-70 text-sm">Повторите новый пароль</Label>
								<Input
									type="password"
									{...register('repeat')}
									placeholder="••••••"
									className="text-base py-2"
								/>
								{errors.repeat && <p className="text-sm text-red-500">{errors.repeat.message}</p>}
							</div>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button type="submit" disabled={isSubmitting} className="text-lg">
										{isSubmitting ? 'Сохраняем…' : 'Сохранить'}
									</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<Button onClick={saveProfile} disabled={saving} className="w-fit text-lg">
					{saving ? 'Сохраняем…' : 'Сохранить'}
				</Button>
			</div>

			<div className="self-start">
				<div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
					<Image src={avatar} fill alt="avatar" className="rounded-full object-cover" />
					<button
						onClick={() => fileRef.current?.click()}
						className="absolute inset-0 rounded-full bg-black/50 text-white font-semibold flex items-center justify-center opacity-0 hover:opacity-100 transition"
					>
						Загрузить
					</button>
				</div>
			</div>

			<input
				ref={fileRef}
				type="file"
				hidden
				accept="image/*"
				onChange={(e) => {
					const file = e.target.files?.[0]
					if (file) {
						setAvatar(URL.createObjectURL(file))
						setAvatarFile(file)
					}
				}}
			/>
		</div>
	)
}
