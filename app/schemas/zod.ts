import { TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS, TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS } from "@/lib/utils";
import { z } from "zod";

export const currencyString = z
    .string()
    .refine(
        (val: string) => {
            const normalized = val.replaceAll(".", "").replace(",", ".");
            const parsed = parseFloat(normalized);

            return !isNaN(parsed) && parsed >= 0;
        },
        {
            error: "Inserisci un importo valido e positivo.",
        },
    )
    .refine(
        (val: string) => {
            const normalized = val.replaceAll(".", "").replace(",", ".");
            const [integer, decimal] = normalized.split(".") as [string, string | undefined];

            const isIntegerValid = integer.length <= TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS;
            const isDecimalValid = decimal ? decimal.length <= TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS : true;

            return isIntegerValid && isDecimalValid;
        },
        {
            error: "Inserisci un importo uguale o inferiore a €999.999.999,99.",
        },
    );

export const nullableCurrencyString = z
    .string()
    .nullable()
    .refine(
        (val: string | null) => {
            if (val == null || val === "") return true;

            const normalized = val.replaceAll(".", "").replace(",", ".");
            const parsed = parseFloat(normalized);

            return !isNaN(parsed) && parsed >= 0;
        },
        {
            error: "Inserisci un importo valido e positivo.",
        },
    )
    .refine(
        (val: string | null) => {
            if (val == null || val === "") return true;

            const normalized = val.replaceAll(".", "").replace(",", ".");
            const [integer, decimal] = normalized.split(".") as [string, string | undefined];

            const isIntegerValid = integer.length <= TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS;
            const isDecimalValid = decimal ? decimal.length <= TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS : true;

            return isIntegerValid && isDecimalValid;
        },
        {
            error: "Inserisci un importo uguale o inferiore a €999.999.999,99.",
        },
    );
