"server only";

import type React from "react";

import { buildNumber } from "@/lib/release";
import { cn } from "@/lib/utils";

export default function ReleaseInfo({ className, ...props }: React.ComponentProps<"h4">) {
    return (
        <h4
            className={cn("bg-primary text-primary-foreground rounded-md px-2 py-1 text-sm leading-none", className)}
            {...props}>
            Release <span className="font-mono">{buildNumber}</span>
        </h4>
    );
}
