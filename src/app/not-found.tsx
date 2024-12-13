import Link from "next/link";
import Wrapper from "@/components/(shared)/common/wrapper";

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
			<Wrapper className="text-center">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="mt-4 text-lg">Страница не найдена.</p>
				<Link href="/" className="mt-6 inline-block text-accent-foreground hover:underline">
					Вернуться на главную
				</Link>
			</Wrapper>
		</div>
	);
}
