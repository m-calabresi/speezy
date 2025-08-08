import Header from "@/components/header";
import Navigation from "@/components/navigation";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
import type React from "react";

type PageProviderProps = React.ComponentProps<"section"> & { path: string };

export function PageProvider({ path, className, children, ...props }: PageProviderProps) {
    return (
        <AuthProvider location={path}>
            <div className="relative w-full px-5">
                <Header />
                <main
                    className={cn("h-full w-full", className)}
                    {...props}>
                    {children}
                </main>
            </div>
            <Navigation pathName={path} />
        </AuthProvider>
    );
}
