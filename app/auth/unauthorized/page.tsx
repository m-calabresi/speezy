import { Button } from "@/components/ui/button";
import LogoDark from "@/public/logo.svg";
import { AlertTriangleIcon, ArrowLeftIcon, LockIcon, LogInIcon, ShieldIcon, ShieldXIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Unauthorized - speezy",
    description: "You don't have permission to access this resource.",
    keywords: ["speezy", "expense", "tracking"],
};

export default function Unauthorized() {
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
                    {/* Error illustration */}
                    <div className="relative">
                        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-orange-500/20">
                            <div className="relative">
                                <ShieldXIcon className="h-16 w-16 text-red-400" />
                                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-2xl">
                                    <AlertTriangleIcon className="text-foreground h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {/* Floating warning elements */}
                        <div className="absolute top-4 left-8 h-6 w-6 animate-pulse rounded-full bg-red-400/30 opacity-60">
                            <LockIcon className="m-1.5 h-3 w-3 text-red-400" />
                        </div>
                        <div className="absolute top-12 right-4 h-8 w-8 animate-pulse rounded-full bg-orange-400/20 opacity-40 delay-300">
                            <ShieldXIcon className="m-2 h-4 w-4 text-orange-400" />
                        </div>
                        <div className="absolute bottom-8 left-4 h-5 w-5 animate-pulse rounded-full bg-red-500/40 opacity-50 delay-700">
                            <span className="flex h-full items-center justify-center text-xs font-bold text-red-300">!</span>
                        </div>
                    </div>

                    {/* Error message */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
                            <ShieldXIcon className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">Access Denied</span>
                        </div>

                        <h2 className="text-foreground text-3xl leading-tight font-bold">Permission Required</h2>

                        <p className="text-foreground/80 text-lg leading-relaxed">You don't have permission to access this resource.</p>

                        <p className="text-foreground/40 text-sm leading-relaxed">
                            This might be because your account doesn't have the required permissions, or you need to sign in with a different account.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-4 pt-4">
                        <Button
                            asChild
                            className="group from-primary to-primary/70 border-primary text-foreground h-14 w-full rounded-2xl border bg-gradient-to-r text-lg font-semibold shadow-lg transition-all duration-200">
                            <Link href="/">
                                <ArrowLeftIcon className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                Go Back Home
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="group border-primary/20 text-foreground/80 hover:border-primary hover:bg-primary/10! hover:text-foreground h-14 w-full rounded-2xl border-2 bg-transparent text-lg font-semibold transition-all duration-200">
                            <Link href="/auth/signin">
                                <LogInIcon className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                Sign In
                            </Link>
                        </Button>
                    </div>

                    {/* Help text */}
                    <div className="text-foreground/20 flex items-center justify-center gap-2 text-sm">
                        <ShieldIcon className="h-4 w-4" />
                        <span>Secure authentication by Keycloak</span>
                    </div>
                </div>
            </main>
        </>
    );
}
