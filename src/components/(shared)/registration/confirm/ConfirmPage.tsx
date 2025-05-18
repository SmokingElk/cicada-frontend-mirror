"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getAuthAPI as authClient} from "../../../../../external/auth/auth";

const {postAuthConfirmAccount} = authClient();

export default function ConfirmPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading"
	);
	const [message, setMessage] = useState("Подтверждаем ваш аккаунт…");

	useEffect(() => {
		const token = searchParams.get("token");

		if (!token) {
			setStatus("error");
			setMessage("Отсутствует токен подтверждения.");
			return;
		}

		postAuthConfirmAccount({token})
			.then(() => {
				setStatus("success");
				setMessage("Ваш аккаунт успешно подтверждён! Через 3 сек. перейдёте ко входу.");
				setTimeout(() => router.push("/login"), 3000);
			})
			.catch((err) => {
				console.error(err);
				setStatus("error");
				setMessage(
					err?.response?.data?.message ??
					"Не удалось подтвердить аккаунт. Попробуйте ещё раз или напишите в поддержку."
				);
			});
	}, [router, searchParams]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-[#F3EFEA] px-4">
			<div className="text-center max-w-md">
				<h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#0D0D0D]">
					{status === "loading" && "Подтверждаем…"}
					{status === "success" && "Готово!"}
					{status === "error" && "Упс!"}
				</h1>

				<p className="mb-8 text-lg leading-relaxed text-[#0D0D0D]/80">
					{message}
				</p>

				{status === "error" && (
					<button
						onClick={() => router.push("/")}
						className="rounded-2xl border-2 border-[#653B1F] px-10 py-3 text-lg font-medium text-[#653B1F] transition hover:bg-[#653B1F] hover:text-white"
					>
						На главную
					</button>
				)}
			</div>

			{status === "loading" && (
				<div
					className="mt-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#653B1F] border-r-transparent"/>
			)}
		</main>
	);
}