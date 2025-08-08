import { getRoles } from "@/lib/auth";
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Keycloak({
            clientId: process.env.AUTH_KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.AUTH_KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                // First-time login, save the `access_token`, its expiry and the `refresh_token`
                token.expires_at = account.expires_at!;
                token.access_token = account.access_token;
                token.refresh_token = account.refresh_token;
                token.id_token = account.id_token;

                // Add user info from Keycloak profile
                token.email = profile.email;
                token.given_name = profile.given_name ?? undefined;
                token.family_name = profile.family_name ?? undefined;
                token.name = profile.name || profile.preferred_username;
                token.sub = profile.sub || token.sub;

                // NOTE: by default roles are not included in id_token (used to construct the profile),
                // we need to extract them fom the decoded access_token.
                token.roles = getRoles(account.access_token!);

                return token;
            } else if (Date.now() < (token.expires_at as number) * 1000) {
                // Subsequent logins, but the `access_token` is still valid
                return token;
            } else {
                // Subsequent logins, but the `access_token` has expired, try to refresh it
                if (!token.refresh_token) {
                    throw new TypeError("Missing refresh_token");
                }

                try {
                    // Keycloak token endpoint
                    const response = await fetch(`${process.env.AUTH_KEYCLOAK_ISSUER!}/protocol/openid-connect/token`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            client_id: process.env.AUTH_KEYCLOAK_ID!,
                            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token as string,
                        }),
                    });

                    const tokenOrError = await response.json();

                    if (!response.ok) throw tokenOrError;

                    const newToken = tokenOrError as {
                        access_token: string;
                        expires_in: number;
                        refresh_token?: string;
                        id_token?: string;
                    };

                    token.expires_at = Math.floor(Date.now() / 1000 + newToken.expires_in);
                    token.access_token = newToken.access_token;
                    token.refresh_token = newToken.refresh_token ?? token.refresh_token;
                    token.id_token = newToken.id_token ?? token.id_token;

                    return token;
                } catch (error) {
                    console.error("Error refreshing access_token", error);

                    // If we fail to refresh the token, return an error so we can handle it on the page
                    token.error = "RefreshTokenError";
                    return token;
                }
            }
        },
        async session({ session, token }) {
            // Send properties to the client
            session.access_token = token.access_token as string;
            session.error = token.error;
            session.user.id = token.sub as string;
            session.user.name = token.name as string;
            session.user.family_name = token.family_name;
            session.user.given_name = token.given_name;
            session.user.email = token.email as string;
            session.user.roles = token.roles as string[];

            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    debug: false, // process.env.NODE_ENV === "development",
});
