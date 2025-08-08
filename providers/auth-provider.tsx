import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type React from "react";

type AuthProviderProps = React.PropsWithChildren & {
    location: string;
};

export async function AuthProvider({ location, children }: AuthProviderProps) {
    const session = await auth();

    if (!session) redirect(`/auth/signin?callbackUrl=${location}`);
    if (session.error === "RefreshTokenError") redirect(`/auth/signin?error=RefreshTokenError&callbackUrl=${location}`);

    return children;
}
