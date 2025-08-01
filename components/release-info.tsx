"server only";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export default function ReleaseInfo({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    const buildNumber = process.env.RELEASE_NAME || "v0.0.0-development";

    return (
        <span className={cn("text-sm leading-none", className)} {...props}>
            Release {buildNumber}
        </span>
    );
}
