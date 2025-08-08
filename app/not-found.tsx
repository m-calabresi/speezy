import { Button } from "@/components/ui/button";
import LogoDark from "@/public/logo.svg";
import { CompassIcon, HelpCircleIcon, HouseIcon, LogInIcon, MapPinIcon, SearchIcon, ShieldIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Not Found - speezy",
    description: "The page you are looking for could not be found.",
    keywords: ["speezy", "expense", "tracking"],
};

export default function NotFound() {
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
                <div className="w-full max-w-md space-y-8 text-center">
                    {/* 404 illustration */}
                    <div className="relative">
                        <div className="border-primary/30 from-primary/20 to-primary/15 mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-3xl border bg-gradient-to-br">
                            <div className="relative">
                                <CompassIcon className="text-primary/50 h-16 w-16" />
                                <div className="bg-chart-1 absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full shadow-2xl">
                                    <HelpCircleIcon className="text-foreground h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {/* Floating navigation elements */}
                        <div className="bg-primary/30 absolute top-4 left-8 h-6 w-6 animate-pulse rounded-full opacity-60">
                            <MapPinIcon className="text-primary/60 m-1.5 h-3 w-3" />
                        </div>
                        <div className="bg-primary/20 absolute top-12 right-4 h-8 w-8 animate-pulse rounded-full opacity-40 delay-300">
                            <SearchIcon className="text-primary m-2 h-4 w-4" />
                        </div>
                        <div className="bg-primary/40 absolute bottom-8 left-4 h-5 w-5 animate-pulse rounded-full opacity-50 delay-700">
                            <span className="text-primary-foreground flex h-full items-center justify-center text-xs font-bold">?</span>
                        </div>
                    </div>

                    {/* 404 message */}
                    <div className="space-y-6">
                        <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                            <CompassIcon className="text-primary h-4 w-4" />
                            <span className="text-primary text-sm font-medium">404 Error</span>
                        </div>

                        <h2 className="text-foreground text-3xl leading-tight font-bold">Page Not Found</h2>

                        <p className="text-foreground/80 text-lg leading-relaxed">Looks like you've wandered off the beaten path. The page you're looking for doesn't exist.</p>

                        <p className="text-foreground/40 text-sm leading-relaxed">Don't worry though, let's get you back to tracking your finances with speezy.</p>
                    </div>

                    {/* Popular destinations */}
                    <div className="border-border bg-background/10 space-y-4 rounded-2xl border p-6">
                        <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">Popular Destinations</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <Link
                                href="/"
                                className="text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg p-2 text-left transition-colors duration-200">
                                💰 Add New Expense
                            </Link>
                            <Link
                                href="/history"
                                className="text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg p-2 text-left transition-colors duration-200">
                                📋 Transaction History
                            </Link>
                            <Link
                                href="/stats"
                                className="text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg p-2 text-left transition-colors duration-200">
                                📊 Spending Stats
                            </Link>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-4 pt-4">
                        <Button
                            asChild
                            className="group from-primary to-primary/70 border-primary text-foreground h-14 w-full rounded-2xl border bg-gradient-to-r text-lg font-semibold shadow-lg transition-all duration-200">
                            <Link href="/">
                                <HouseIcon className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                Take Me Home
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="group border-primary/20 text-foreground/80 hover:border-primary hover:bg-primary/10! hover:text-foreground h-14 w-full rounded-2xl border-2 bg-transparent text-lg font-semibold transition-all duration-200">
                            <Link href="/auth/signin">
                                <LogInIcon className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                Sign In Instead
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
