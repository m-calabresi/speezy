import type { TransactionType } from "@/types/transaction";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type FormatCurrencyProps = {
    displayCurrencySign?: boolean;
    displayCurrencySymbol?: boolean;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (currency: number, { displayCurrencySign, displayCurrencySymbol }: FormatCurrencyProps = { displayCurrencySign: true, displayCurrencySymbol: true }) => {
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

export const formatTransaction = (type: TransactionType) => {
    const formatMap: { [key in TransactionType]: string } = {
        expense: "Spesa aggiunta",
        earning: "Entrata aggiunta",
        borrowFulfill: "Debito aggiunto",
        borrowPending: "Debito aggiunto",
        lendFulfill: "Prestito aggiunto",
        lendPending: "Prestito aggiunto",
    };
    return formatMap[type];
};

export const capitalize = (str: string, locale: string = navigator.language) => str.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale));
