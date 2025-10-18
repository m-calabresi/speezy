import type { LucideIcon } from "lucide-react";

export const transactionTypes = ["expense", "earning", "lendPending", "borrowPending", "lendFulfill", "borrowFulfill"] as const;

export type TransactionType = (typeof transactionTypes)[number];

export type Transaction = {
    id: string;
    transactionAt: Date;
    amount: number;
    description: string;
    type: TransactionType;
};

/*
    NOTE: by default postgres.js converts PostgreSQL numbers
    into `string` to overcome JS representational limitation.

    @see: https://github.com/porsager/postgres?tab=readme-ov-file#numbers-bigint-numeric
*/
export type RawTransaction = Omit<Transaction, "amount"> & {
    amount: string;
};

export type FormTransaction = {
    amount: number;
    description: string;
    type: TransactionType;
    icon: LucideIcon;
};

export type TransactionOption = {
    name: string;
    description: string;
    type: TransactionType;
    Icon: LucideIcon;
};
