import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (currency: number) =>
    new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        signDisplay: "always",
    }).format(currency);

export const formatDate = (date: Date) => {
    const isCurrentYear = date.getFullYear() === new Date().getFullYear();
    return date.toLocaleDateString("it-IT", {
        day: "numeric",
        month: isCurrentYear ? "long" : "short",
        year: isCurrentYear ? undefined : "numeric",
    });
};
