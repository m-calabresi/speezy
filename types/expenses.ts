import type { LucideIcon } from "lucide-react";

import type { CustomLucideIcon } from "@/components/ui/icons";

export const expenseOptionTypes = ["expense", "earning", "lendPending", "borrowPending", "lendFulfill", "borrowFulfill"] as const;

export type ExpenseOptionType = (typeof expenseOptionTypes)[number];

export type ExpenseOption = {
    type: ExpenseOptionType;
    name: string;
    description: string;
    Icon: LucideIcon | CustomLucideIcon;
};
