"use client"

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {getAuthAPI as authClient} from "@/../api/auth/auth";

const { postAuthRegister } = authClient();

/**
 * Zod schema для формы регистрации
 * Пароль минимум 6 символов, Email — валидный, username — не короче 3‑х символов
 */
const registrationSchema = z
	.object({
		email: z.string({ required_error: "Email обязателен" }).email("Невалидный email"),
		username: z
			.string({ required_error: "Ник обязателен" })
			.min(3, "Минимум 3 символа"),
		password: z
			.string({ required_error: "Пароль обязателен" })
			.min(6, "Минимум 6 символов"),
		confirmPassword: z.string({ required_error: "Повторите пароль" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Пароли не совпадают",
	});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegistrationValues>({
		resolver: zodResolver(registrationSchema),
	});

	async function onSubmit(values: RegistrationValues) {
		try {
			await postAuthRegister({
				email: values.email,
				username: values.username,
				password: values.password,
			});

			toast.success("Регистрация прошла успешно!", { duration: 4000 });
			reset();
			setTimeout(() => router.push("/"), 300);
		} catch (error: any) {
			console.log(error);
			const message = error?.response?.data?.message ?? "Что‑то пошло не так";
			toast.error(`Ошибка: ${message}`);
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted p-4"
		>
			<Card className="w-full max-w-md rounded-2xl shadow-xl border-none bg-background">
				<CardHeader className="text-center px-10 pt-10">
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
						Регистрация
					</h1>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4 px-10 pb-6">
						<div className="space-y-1">
							<Label htmlFor="email">E‑mail</Label>
							<Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
							{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
						</div>

						<div className="space-y-1">
							<Label htmlFor="username">Никнейм</Label>
							<Input id="username" placeholder="chessMaster" {...register("username")} />
							{errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
						</div>

						<div className="space-y-1">
							<Label htmlFor="password">Пароль</Label>
							<Input id="password" type="password" {...register("password")} />
							{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
						</div>

						<div className="space-y-1">
							<Label htmlFor="confirmPassword">Повторите пароль</Label>
							<Input id="confirmPassword" type="password" {...register("confirmPassword")} />
							{errors.confirmPassword && (
								<p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
							{isSubmitting ? "Регистрация…" : "Создать аккаунт"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</motion.div>
	);
}
