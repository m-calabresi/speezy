import type { LucideIcon } from "lucide-react";

import type { CustomLucideIcon } from "@/components/ui/icons";

export const expenseOptionTypes = ["expense", "earning", "lendPending", "borrowPending", "lendFulfill", "borrowFulfill"] as const;

export type ExpenseOptionType = {
    type: (typeof expenseOptionTypes)[number];
    name: string;
    description: string;
    Icon: LucideIcon | CustomLucideIcon;
};
