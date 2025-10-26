import type React from "react";

import Header from "@/components/header";
import Navigation from "@/components/navigation";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";

type PageProviderProps = React.ComponentProps<"section"> & { path: string };

export function PageProvider({ path, className, children, ...props }: PageProviderProps) {
    return (
        <AuthProvider location={path}>
            <div className="mb-safe-offset-24 relative flex h-full w-full flex-col gap-3 px-5">
                <Header />
                <main
                    className={cn("scrollbar-hidden mb-[5rem] w-full flex-1 overflow-auto md:mb-[5.75rem] xl:mb-0", className)}
                    {...props}>
                    {children}
                </main>
            </div>
            <Navigation />
        </AuthProvider>
    );
}
