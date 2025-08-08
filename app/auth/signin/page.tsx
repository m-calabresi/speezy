import { auth } from "@/auth";
import { SignInButton } from "@/components/auth/buttons";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import LogoDark from "@/public/logo.svg";
import { ArrowRightIcon, ShieldAlertIcon, ShieldIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import type { User } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In - speezy",
    description: "Sign in to continue your expense tracking.",
    keywords: ["speezy", "expense", "tracking"],
};

interface SignInPageProps {
    searchParams: Promise<{
        callbackUrl?: string;
        error?: string;
    }>;
}

const getErrorMessage = (error: string | undefined) => {
    switch (error) {
        case "RefreshTokenError":
            return "Your session has expired. Please sign in again.";
        case "SignIn":
            return "An error occurred during sign in. Please try again.";
        case "OAuthSignin":
            return "Error occurred during OAuth sign in. Please sign in again.";
        case "OAuthCallbackError":
            return "Error occurred during OAuth callback. Please sign in again.";
        case "OAuthCreateAccount":
            return "Could not create OAuth account. Please sign in again.";
        case "EmailCreateAccount":
            return "Could not create email account. Please sign in again.";
        case "Callback":
            return "Error occurred during callback. Please sign in again.";
        case "OAuthAccountNotLinked":
            return "OAuth account is not linked to any existing account. Please sign in again.";
        case "EmailSignin":
            return "Check your email for a sign in link.";
        case "CredentialsSignin":
            return "Invalid credentials. Please sign in again.";
        case "SessionRequired":
            return "Please sign in to access this page.";
        default:
            return `An error occurred during sign in: ${!!error ? error : "unknown error"}. Please try again.`;
    }
};

const UserInfo = ({ user }: { user: User | undefined }) => {
    if (!user || (!user.image && (!user.family_name || !user.given_name))) return <UserIcon className="text-primary/90 h-12 w-12" />;

    const userInitials = user.given_name && user.family_name ? `${user.given_name[0]}${user.family_name[0]}` : "";

    return (
        <UserAvatar
            image={user.image || "#"}
            fallback={userInitials}
            className="h-24 w-24"
            fallbackClassName="bg-transparent text-4xl"
        />
    );
};

const getWelcomeMessage = (user: User | undefined, error: string | undefined) => {
    if (error) return "Sign In";
    return `Welcome Back${user?.given_name ? `, ${user.given_name}!` : "!"}`;
};

export default async function SignIn({ searchParams }: SignInPageProps) {
    const { callbackUrl, error } = await searchParams;
    const session = await auth();

    if (!error && session && session.user) redirect("/");

    return (
        <>
            {/* Header with logo */}
            <header className="flex justify-center p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg">
                        <Image
                            src={LogoDark}
                            alt="speezy logo"
                            className="h-8 w-8"
                        />
                    </div>
                    <h1 className="font-bricolage-grotesque from-primary to-chart-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">speezy</h1>
                </div>
            </header>

            {/* Main content */}
            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
                <div className="w-full max-w-sm space-y-8 text-center">
                    {/* Error message (if present) */}
                    {error && (
                        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                            <div className="mb-2 flex items-center justify-center gap-2 text-red-400">
                                <ShieldAlertIcon className="h-5 w-5" />
                                <span className="font-medium">Authentication Required</span>
                            </div>
                            <p className="text-sm leading-relaxed text-red-300">{getErrorMessage(error)}</p>
                        </div>
                    )}

                    {/* User avatar/icon */}
                    <div>
                        <div className="border-primary/30 from-primary/20 to-primary/15 relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border bg-gradient-to-br">
                            <UserInfo user={session?.user} />
                            {/* Status indicator */}
                            <div className={cn("border-background/80 absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2", error ? "bg-red-600" : "bg-primary")}>
                                {error ? <ShieldAlertIcon className="text-foreground h-4 w-4" /> : <ShieldIcon className="text-foreground h-4 w-4" />}
                            </div>
                        </div>
                    </div>

                    {/* Welcome back message */}
                    <div className="space-y-4">
                        <h2 className="text-foreground text-3xl leading-tight font-bold">{getWelcomeMessage(session?.user, error)}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {error ? "Sign in again to continue with your expense tracking" : "Pick up where you left off with your expense tracking"}
                        </p>
                    </div>

                    {/* Sign in button */}
                    <div className="pt-4">
                        <SignInButton
                            callbackUrl={callbackUrl}
                            className="group from-primary to-primary/70 border-primary text-foreground h-14 w-full rounded-2xl border bg-gradient-to-r text-lg font-semibold shadow-lg transition-all duration-200">
                            {error ? "Sign In Again" : "Continue to Speezy"}
                            <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </SignInButton>
                    </div>

                    {/* Security note */}
                    <div className="text-foreground/20 flex items-center justify-center gap-2 text-sm">
                        <ShieldIcon className="h-4 w-4" />
                        <span>Secure authentication by Keycloak</span>
                    </div>
                </div>
            </main>
        </>
    );
}
