'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import headerMenuItems from '@/hardcode/headerMenuItems';

export default function Nav() {
	const {data: session, status} = useSession();

	if (status === 'loading') return null;

	const isAuth = status === 'authenticated';

	const items = headerMenuItems.filter((i) =>
		i.visibility === 'auth' ? isAuth
			: i.visibility === 'guest' ? !isAuth
				: true
	);

	return (
		<nav className="hidden md:flex h-full items-center gap-8">
			{items.map((i) =>
				i.action === 'logout' ? (
					<button
						key={i.label}
						onClick={() => signOut({callbackUrl: '/login'})}
						className="opacity-50 hover:opacity-100 transition-opacity"
					>
						{i.label}
					</button>
				) : (
					<Link
						key={i.href ?? i.label}
						href={i.href!}
						className="opacity-50 hover:opacity-100 transition-opacity"
					>
						{i.label}
					</Link>
				)
			)}
		</nav>
	);
};
