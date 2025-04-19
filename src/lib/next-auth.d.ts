import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?:  string;
		refreshToken?: string;
		error?: "RefreshAccessTokenError";
	}

	interface User {
		id: string;
		access_token:       string;
		refresh_token:      string;
		access_expires_in:  number;
		refresh_expires_in: number;
		token_type?:        string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?:        string;
		refreshToken?:       string;
		accessTokenExpires?: number;
		refreshExpires?:     number;
		error?: "RefreshAccessTokenError";
	}
}
