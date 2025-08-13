import { type LucideIcon, HandCoinsIcon } from "lucide-react";
import type React from "react";

import { cn } from "@/lib/utils";

export const HandCoinsFlippedIcon = ({ className, ...props }: React.ComponentProps<LucideIcon>) => (
    <HandCoinsIcon
        className={cn("scale-x-[-1]", className)}
        {...props}
    />
);

export type CustomLucideIcon = typeof HandCoinsFlippedIcon;
