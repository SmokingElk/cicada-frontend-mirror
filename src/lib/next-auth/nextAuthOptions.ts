import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { RequestInternal } from "next-auth";
import type { JWT } from "next-auth/jwt";
import axios from "axios";
import { getAuthAPI as authApi} from "../../../external/auth/auth";
const { postAuthLogin, postAuthRefresh, getAuthLogout } = authApi();

async function refreshAccessToken(old: JWT): Promise<JWT> {
	try {
		const res = await postAuthRefresh({ refresh_token: old.refreshToken! });
		const d = res.data.data;
		return {
			...old,
			accessToken: d?.access_token,
			accessTokenExpires: Date.now() + (d?.expires_in ?? 0) * 1000,
		};
	} catch {
		return { ...old, error: "RefreshAccessTokenError" };
	}
}

export const authOptions: NextAuthOptions = {
	debug: process.env.NODE_ENV === "development",
	providers: [
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(
				credentials: Record<"email" | "password", string> | undefined,
				_req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
			) {
				if (!credentials) return null;
				try {
					const res = await postAuthLogin({
						email: credentials.email,
						password: credentials.password,
					});
					const t = res.data.data;
					if (!t?.access_token || !t.refresh_token) return null;
					return {
						id: credentials.email,
						access_token: t.access_token,
						refresh_token: t.refresh_token,
						access_expires_in: t.access_expires_in!,
						refresh_expires_in: t.refresh_expires_in!,
						token_type: t.token_type,
					};
				} catch (err) {
					if (axios.isAxiosError(err)) {
						console.error("auth error", err.response?.status, err.response?.data);
					} else {
						console.error("auth error", err);
					}
					return null;
				}
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = (user as any).access_token;
				token.refreshToken = (user as any).refresh_token;
				token.accessTokenExpires =
					Date.now() + (user as any).access_expires_in * 1000;
				token.refreshExpires =
					Date.now() + (user as any).refresh_expires_in * 1000;
				return token;
			}
			if (Date.now() < (token.accessTokenExpires as number) - 5000) return token;
			if (Date.now() < (token.refreshExpires as number) - 5000)
				return await refreshAccessToken(token);
			return { ...token, error: "RefreshAccessTokenError" };
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string | undefined;
			session.refreshToken = token.refreshToken as string | undefined;
			session.error = token.error as any;
			return session;
		},
	},
	events: {
		async signOut({ token }) {
			if (!token?.accessToken) return;
			try {
				await getAuthLogout({
					headers: {
						Authorization: `Bearer ${token.accessToken}`,
						"Content-Type": "application/json",
					},
				});
			} catch (e) {
				console.error("logout error", e);
			}
		},
	},


	secret: process.env.NEXTAUTH_SECRET,
};
