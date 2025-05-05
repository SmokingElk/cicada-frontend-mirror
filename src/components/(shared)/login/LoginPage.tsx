"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const schema = z.object({
	email:    z.string().email('Невалидный email'),
	password: z.string().min(6, 'Минимум 6 символов'),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Values>({ resolver: zodResolver(schema) });

	const onSubmit = async (values: Values) => {
		const res = await signIn('credentials', {
			redirect: false,
			email:    values.email,
			password: values.password,
		});

		if (res?.error) {
			toast.error(res.error === 'CredentialsSignin'
				? 'Неверные данные'
				: res.error);
		} else {
			toast.success('Добро пожаловать!', { duration: 4000 });
			router.push('/');
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted p-4"
		>
			<Card className="w-full max-w-md rounded-2xl shadow-xl border-none bg-background">
				<CardHeader className="text-center px-10 pt-10">
					<h1 className="text-3xl font-extrabold tracking-tight">Вход</h1>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4 px-10 pb-6">
						<div className="space-y-1">
							<Label htmlFor="email">E‑mail</Label>
							<Input id="email" type="email" {...register('email')} />
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-1">
							<Label htmlFor="password">Пароль</Label>
							<Input id="password" type="password" {...register('password')} />
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
					</CardContent>

					<CardFooter className="px-10 pb-10">
						<Button
							type="submit"
							className="w-full text-lg font-semibold rounded-xl py-6"
							variant="transparrent"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Входим…' : 'Войти'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</motion.div>
	);
}
