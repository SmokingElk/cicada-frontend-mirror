import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

import { get as authApi } from "@/../api/auth/auth";
import axios from "axios";
const { postAuthLogin, postAuthRefresh, postAuthLogout } = authApi();

export const runtime = "nodejs";

async function refreshAccessToken(oldToken: JWT): Promise<JWT> {
	try {
		const res = await postAuthRefresh({ refresh_token: oldToken.refreshToken! });
		const data = res.data.data;

		return {
			...oldToken,
			accessToken: data?.access_token,
			accessTokenExpires: Date.now() + (data?.expires_in ?? 0) * 1000,
		};
	} catch (e) {
		console.error("🔴 refresh error", e);
		return { ...oldToken, error: "RefreshAccessTokenError" };
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
			async authorize(credentials, _req) {
				if (!credentials) return null;

				try {
					const res = await postAuthLogin({
						email:    credentials.email,
						password: credentials.password,
					});

					console.log('✅  /auth/login status:', res.status);
					console.log('✅  /auth/login data  :', res.data);

					const t = res.data.data;
					if (!t?.access_token || !t.refresh_token) {
						console.log('❌  токены не пришли');
						return null;
					}

					return {
						id: credentials.email,
						access_token:       t.access_token,
						refresh_token:      t.refresh_token,
						access_expires_in:  t.access_expires_in!,
						refresh_expires_in: t.refresh_expires_in!,
						token_type:         t.token_type,
					};
				} catch (err) {
					if (axios.isAxiosError(err)) {
						console.error('🔴  Axios error', err.response?.status);
						console.error('🔴  Axios data ', err.response?.data);
					} else {
						console.error('🔴  Unknown error', err);
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
				token.accessTokenExpires = Date.now() + (user as any).access_expires_in * 1000;
				token.refreshExpires = Date.now() + (user as any).refresh_expires_in * 1000;
				return token;
			}

			if (Date.now() < (token.accessTokenExpires as number) - 5_000) {
				return token;
			}

			if (Date.now() < (token.refreshExpires as number) - 5_000) {
				return await refreshAccessToken(token);
			}

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
			if (token?.refreshToken) {
				try {
					await postAuthLogout();
				} catch (e) {
					console.error("🔴 logout error", e);
				}
			}
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
