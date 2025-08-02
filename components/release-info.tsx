"server only";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const buildNumber = process.env.RELEASE_NAME || "v0.0.0-development";

export default function ReleaseInfo({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return (
        <h4 className={cn("bg-primary text-primary-foreground rounded-md px-2 py-1 text-sm leading-none", className)} {...props}>
            Release <span className="font-mono">{buildNumber}</span>
        </h4>
    );
}
