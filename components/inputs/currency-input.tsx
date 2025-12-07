"use client";

import { Input } from "@/components/ui/input";
import { cn, formatCurrency, TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS, TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS } from "@/lib/utils";
import { EuroIcon } from "lucide-react";

type CurrencyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onChange: (value: string) => void;
    onBlur: () => void;
};

const handleInput = (e: React.FormEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Remove any invalid characters (keep only digits and comma)
    const cleaned = value.replace(/[^0-9,]/g, "");

    const parts = cleaned.split(",");
    let result = parts[0];

    // truncate input to max allowed
    if (result.length > TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS) {
        result = result.substring(0, TRANSACTION_AMOUNT_MAX_INTEGER_DIGITS);
    }

    // Ensure only one comma
    if (parts.length > 1) {
        result += "," + parts[1].substring(0, TRANSACTION_AMOUNT_MAX_DECIMAL_DIGITS); // truncate to max decimal places
    }

    if (result !== value) {
        input.value = result;
        // Trigger form update
        onChange(result);
    }
};

export function CurrencyInput({ onChange, onBlur, className, ...props }: CurrencyInputProps) {
    return (
        <div className="relative">
            <Input
                placeholder="0.00"
                step="0.01"
                inputMode="decimal"
                type="text"
                className={cn("w-full ps-9", className)}
                onInput={(e) => handleInput(e, onChange)}
                onChange={(e) => onChange(e.target.value)}
                onBlur={(e) => {
                    const raw = parseFloat(e.target.value.replace(/[^0-9,]/g, "").replace(",", "."));
                    const formatted = isNaN(raw) ? "" : formatCurrency(raw, { displayCurrencySign: false, displayCurrencySymbol: false });

                    onChange(formatted);
                    onBlur();
                }}
                {...props}
            />

            <EuroIcon className="text-muted-foreground absolute start-0 top-1/2 ms-3 h-4 w-4 -translate-y-1/2" />
        </div>
    );
}
