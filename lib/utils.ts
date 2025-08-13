import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (currency: number, displayCurrencySign: boolean = true, displayCurrencySymbol: boolean = true) => {
    const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        signDisplay: displayCurrencySign ? "always" : "never",
    }).format(currency);

    if (displayCurrencySymbol) return formatted;
    return formatted.substring(0, formatted.length - 2);
};

export const formatDate = (date: Date, dynamic: boolean = true) => {
    const isCurrentYear = date.getFullYear() === new Date().getFullYear();
    return date.toLocaleDateString("it-IT", {
        day: "numeric",
        month: dynamic && isCurrentYear ? "long" : "short",
        year: dynamic && isCurrentYear ? undefined : "numeric",
    });
};
