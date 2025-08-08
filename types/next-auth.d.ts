import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        access_token?: string;
        error?: "RefreshTokenError";
        user: {
            id: string;
            name?: string | null;
            given_name?: string;
            family_name?: string;
            email?: string | null;
            image?: string | null;
            roles?: string[];
        };
    }

    interface Profile {
        preferred_username?: string;
        email?: string;
        name?: string;
        sub?: string;
    }

    interface User {
        given_name?: string;
        family_name?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        expires_at?: number;
        access_token?: string;
        refresh_token?: string;
        id_token?: string;
        roles?: string[];
        given_name?: string;
        family_name?: string;
        error?: "RefreshTokenError";
    }
}
