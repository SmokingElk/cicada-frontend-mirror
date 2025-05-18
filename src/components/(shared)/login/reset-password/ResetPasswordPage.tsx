"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { getAuthAPI as authClient } from "@/../api/auth/auth";
const { postAuthResetPassword } = authClient();

const schema = z
	.object({
		password: z.string().min(6, "Минимум 6 символов"),
		confirm: z.string(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Пароли не совпадают",
		path: ["confirm"],
	});

type Values = z.infer<typeof schema>;

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<Values>({ resolver: zodResolver(schema) });

	if (!token) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
				<Card className="max-w-md rounded-2xl bg-background p-10 text-center shadow-xl">
					<h1 className="mb-4 text-2xl font-semibold">Недействительная ссылка</h1>
					<p className="text-muted-foreground">Отсутствует токен сброса пароля.</p>
					<Button className="mt-6" onClick={() => router.push("/")}>На главную</Button>
				</Card>
			</div>
		);
	}

	const onSubmit = async (values: Values) => {
		try {
			await postAuthResetPassword(
				{ new_password: values.password },
				{ token: token }
			);
			toast.success("Пароль успешно изменён! Перенаправляем на вход…");
			reset();
			setTimeout(() => router.push("/login"), 2500);
		} catch (err: any) {
			console.error(err);
			toast.error(
				"Не удалось изменить пароль. Ссылка могла устареть."
			);
		}
	};

	/* -------------------- UI -------------------- */
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex min-h-screen items-center justify-center bg-muted p-4"
		>
			<Card className="w-full max-w-md rounded-2xl border-none bg-background shadow-xl">
				<CardHeader className="px-10 pt-10 text-center">
					<h1 className="text-3xl font-extrabold tracking-tight">
						Сброс пароля
					</h1>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4 px-10 pb-6">
						<div className="space-y-1">
							<Label htmlFor="password">Новый пароль</Label>
							<Input
								id="password"
								type="password"
								className="border border-neutral-300 focus:border-brown-600 focus:ring-0"
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-sm text-red-500">{errors.password.message}</p>
							)}
						</div>

						<div className="space-y-1">
							<Label htmlFor="confirm">Повторите пароль</Label>
							<Input
								id="confirm"
								type="password"
								className="border border-neutral-300 focus:border-brown-600 focus:ring-0"
								{...register("confirm")}
							/>
							{errors.confirm && (
								<p className="text-sm text-red-500">{errors.confirm.message}</p>
							)}
						</div>
					</CardContent>

					<CardFooter className="px-10 pb-10">
						<Button
							type="submit"
							className="w-full rounded-xl py-6 text-lg font-semibold"
							variant="transparrent"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Сохраняем…" : "Сменить пароль"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</motion.div>
	);
}
