import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import type React from "react";

export async function SignInButton({ callbackUrl, className, children, ...props }: React.ComponentProps<typeof Button> & { callbackUrl?: string }) {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("keycloak", {
                    redirectTo: callbackUrl || "/",
                });
            }}>
            <Button
                type="submit"
                variant="default"
                className={className}
                {...props}>
                {children}
            </Button>
        </form>
    );
}

export async function SignOutButton({ callbackUrl, className, children, ...props }: React.ComponentProps<typeof Button> & { callbackUrl?: string }) {
    return (
        <form
            className="h-full w-full"
            action={async () => {
                "use server";
                await signOut({
                    redirectTo: callbackUrl || "/",
                });
            }}>
            <Button
                type="submit"
                className={className}
                {...props}>
                {children}
            </Button>
        </form>
    );
}
