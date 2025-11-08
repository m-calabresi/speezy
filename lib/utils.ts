import type { TransactionType } from "@/types/transaction";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS = 9;
export const TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS = 2;

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

type Action = "create" | "update" | "delete";

const formatFemaleAction = (action: Action) => {
    switch (action) {
        case "create":
            return "aggiunta";
        case "update":
            return "aggiornata";
        case "delete":
            return "rimossa";
    }
};

const formatMaleAction = (action: Action) => {
    switch (action) {
        case "create":
            return "aggiunto";
        case "update":
            return "aggiornato";
        case "delete":
            return "rimosso";
    }
};

export const formatTransaction = (type: TransactionType, { action }: { action: Action }) => {
    const maleAction = formatMaleAction(action);
    const femaleAction = formatFemaleAction(action);

    const formatMap: { [key in TransactionType]: string } = {
        expense: `Spesa ${femaleAction}`,
        earning: `Entrata ${femaleAction}`,
        borrowFulfill: `Debito ${maleAction}`,
        borrowPending: `Debito ${maleAction}`,
        lendFulfill: `Prestito ${maleAction}`,
        lendPending: `Prestito ${maleAction}`,
    };
    return formatMap[type];
};

export const capitalize = (str: string, locale: string = navigator.language) => str.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase(locale));
