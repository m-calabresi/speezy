import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import type React from "react";

export function Modal({ children, ...props }: React.ComponentProps<typeof AlertDialog>) {
    return <AlertDialog {...props}>{children}</AlertDialog>;
}

export function ModalTrigger({ children, ...props }: React.ComponentProps<typeof AlertDialogTrigger>) {
    return <AlertDialogTrigger {...props}>{children}</AlertDialogTrigger>;
}

export function ModalAction({ className, children, ...props }: React.ComponentProps<typeof AlertDialogAction>) {
    return (
        <AlertDialogAction
            variant="ghost"
            className="h-full w-full font-normal"
            {...props}>
            {children}
        </AlertDialogAction>
    );
}

export function ModalContent({ className, children, ...props }: React.ComponentProps<typeof AlertDialogContent>) {
    return (
        <AlertDialogContent
            className={cn("rounded-3xl p-0", className)}
            {...props}>
            {children}
        </AlertDialogContent>
    );
}

export function ModalHeader({ className, children, ...props }: React.ComponentProps<typeof AlertDialogHeader>) {
    return (
        <AlertDialogHeader
            className={cn("w-full", className)}
            {...props}>
            <AlertDialogTitle className="bg-background text-foreground flex w-full items-center justify-between rounded-3xl px-6 py-4">
                <AlertDialogCancel asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="dark:bg-background! dark:hover:bg-input! border-none shadow-none! dark:border-none">
                        <XIcon className="text-muted-foreground size-6" />
                    </Button>
                </AlertDialogCancel>
                {children}
                <div className="w-9" /> {/* same size as button > size */}
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">User profile modal</AlertDialogDescription>
        </AlertDialogHeader>
    );
}

export function ModalTitle({ className, children, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            className={cn("mb-1 text-base font-normal", className)}
            {...props}>
            {children}
        </span>
    );
}

export function ModalBody({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("mx-6 space-y-2 rounded-3xl last:mb-6", className)}
            {...props}>
            {children}
        </div>
    );
}

export function ModalBodyOptionGroup({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("bg-card px-6 py-2 first:rounded-t-3xl last:rounded-b-3xl", className)}
            {...props}>
            {children}
        </div>
    );
}

export function ModalBodyOption({ className, children, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("h-14 w-full justify-start px-0 font-normal", className)}
            {...props}>
            {children}
        </div>
    );
}

export function ModalFooter({ className, children, ...props }: React.ComponentProps<typeof AlertDialogFooter>) {
    return (
        <AlertDialogFooter
            className={cn("bg-background rounded-b-3xl px-6 pb-4", className)}
            {...props}>
            {children}
        </AlertDialogFooter>
    );
}
