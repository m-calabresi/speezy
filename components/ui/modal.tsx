import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type React from "react";

export function Modal({ children, ...props }: React.ComponentProps<typeof Dialog>) {
    return <Dialog {...props}>{children}</Dialog>;
}

export function ModalTrigger({ children, ...props }: React.ComponentProps<typeof DialogTrigger>) {
    return <DialogTrigger {...props}>{children}</DialogTrigger>;
}

export function ModalClose({ className, children, ...props }: React.ComponentProps<typeof DialogClose>) {
    return (
        <DialogClose
            className={cn("h-full w-full font-normal", className)}
            {...props}>
            {children}
        </DialogClose>
    );
}

export function ModalContent({ className, children, ...props }: React.ComponentProps<typeof DialogContent>) {
    return (
        <DialogContent
            className={cn("rounded-3xl p-0", className)}
            {...props}>
            {children}
        </DialogContent>
    );
}

export function ModalHeader({ className, children, ...props }: React.ComponentProps<typeof DialogHeader>) {
    return (
        <DialogHeader
            className={cn("w-full", className)}
            {...props}>
            <DialogTitle className="bg-background text-foreground mx-auto rounded-3xl px-6 py-4">{children}</DialogTitle>
            <DialogDescription className="sr-only">User profile modal</DialogDescription>
        </DialogHeader>
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
            className={cn("mx-6 space-y-2 rounded-3xl", className)}
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

export function ModalFooter({ className, children, ...props }: React.ComponentProps<typeof DialogFooter>) {
    return (
        <DialogFooter
            className={cn("bg-background rounded-b-3xl px-6 pb-4", className)}
            {...props}>
            {children}
        </DialogFooter>
    );
}
