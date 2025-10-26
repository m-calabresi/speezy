"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CoinsIcon, EuroIcon, HandHelpingIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, formatCurrency, formatDate, formatTransaction } from "@/lib/utils";
import { addTransaction } from "@/queries/transactions";
import { transactionTypes, type TransactionOption } from "@/types/transaction";

const transactionOptions: TransactionOption[] = [
    {
        type: "expense",
        name: "Spesa",
        description: "Ho speso denaro.",
        Icon: ShoppingBagIcon,
    },
    {
        type: "earning",
        name: "Entrata",
        description: "Ho ricevuto denaro.",
        Icon: EuroIcon,
    },
    {
        type: "lendPending",
        name: "Prestito",
        description: "Ho prestato denaro, mi deve ritornare.",
        Icon: HandHelpingIcon,
    },
    {
        type: "borrowPending",
        name: "Debito",
        description: "Ho chiesto un prestito, devo restituire denaro.",
        Icon: CoinsIcon,
    },
];

const FormSchema = z.object({
    transactionAt: z.date({
        error: "Seleziona la data della transazione.",
    }),
    amount: z.string().refine(
        (val: string) => {
            const normalized = val.replace(".", "").replace(",", ".");
            const parsed = parseFloat(normalized);

            return !isNaN(parsed) && parsed >= 0;
        },
        {
            error: "Inserisci un importo valido e positivo.",
        },
    ),
    description: z.string().min(1, { error: "Inserisci una descrizione." }).max(1000, { error: "La descrizione non deve superare i 100 caratteri." }),
    type: z.enum(transactionTypes, { error: "Seleziona un tipo di transazione valido" }),
});

export function NewTransactionForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema, undefined, { raw: true }),
        defaultValues: {
            transactionAt: new Date(),
            amount: "",
            description: "",
            type: "expense",
        },
    });

    async function onSubmit(raw: z.infer<typeof FormSchema>) {
        const data = {
            ...raw,
            transactionAt: raw.transactionAt,
            amount: parseFloat(raw.amount.replace(".", "").replace(",", ".")),
            description: raw.description.trim(),
        };

        try {
            await addTransaction(data);

            form.reset();
            toast.success(`${formatTransaction(raw.type)}!`);
        } catch (error) {
            console.error(error);

            const message = typeof error === "string" ? error : "Si è verificato un problema, riprova.";
            toast.error(message);
        }
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        // Remove any invalid characters (keep only digits and comma)
        const cleaned = value.replace(/[^0-9,]/g, "");

        // Ensure only one comma
        const parts = cleaned.split(",");
        let result = parts[0];
        if (parts.length > 1) {
            result += "," + parts[1].substring(0, 2); // Max 2 decimal places
        }

        if (result !== value) {
            input.value = result;
            // Trigger form update
            onChange(result);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 pt-3 pb-5 md:mx-auto md:grid md:max-w-4xl md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_auto] md:gap-4 md:space-y-4">
                <FormField
                    control={form.control}
                    name="transactionAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col md:col-start-1 md:row-start-1">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full items-center justify-start pl-3 text-left font-normal")}>
                                            <CalendarIcon className="text-muted-foreground h-4 w-4" />
                                            {field.value ? formatDate(field.value, false) : <span>Pick a date</span>}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { onChange, onBlur, ...field } }) => (
                        <FormItem className="md:col-start-1 md:row-start-2">
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="0.00"
                                        step="0.01"
                                        inputMode="decimal"
                                        type="text"
                                        className="w-full ps-9"
                                        onInput={(e) => handleInput(e, onChange)}
                                        onChange={onChange}
                                        onBlur={(e) => {
                                            const raw = parseFloat(e.target.value.replace(/[^0-9,]/g, "").replace(",", "."));
                                            const formatted = isNaN(raw) ? "" : formatCurrency(raw, { displayCurrencySign: false, displayCurrencySymbol: false });

                                            onChange(formatted);
                                            onBlur();
                                        }}
                                        {...field}
                                    />
                                    <EuroIcon className="text-muted-foreground absolute start-0 top-1/2 ms-3 h-4 w-4 -translate-y-1/2" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="md:col-start-1 md:row-start-3">
                            <FormLabel>Descrizione</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descrivi la transazione"
                                    className="resize-none"
                                    maxLength={100}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>{field.value.length}/100 caratteri</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="md:col-start-2 md:row-span-4 md:row-start-1">
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    {...field}
                                    type="single"
                                    value={field.value}
                                    onValueChange={(val) => {
                                        if (val) field.onChange(val); // prevent unselect
                                    }}
                                    className="grid w-full grid-cols-2 gap-4">
                                    {transactionOptions.map(({ type, name, description, Icon }) => (
                                        <ToggleGroupItem
                                            key={type}
                                            value={type}
                                            className="last-two:h-30 last-two:[&>svg]:size-4 last-two:[&>svg]:text-muted-foreground/50 last-two:[&>p]:text-muted-foreground/50 last-two:[&>h3]:mt-0 last-two:text-sm last-two:[&>h3]:text-muted-foreground/70 last-two:justify-start border-primary hover:ring-primary data-[state=on]:bg-primary data-[state=on]:text-foreground h-50 flex-col items-center justify-center rounded border p-2 text-lg hover:bg-transparent hover:ring-4 data-[state=on]:hover:ring-transparent">
                                            <Icon className="text-muted-foreground size-8" />
                                            <h3 className="text-foreground mt-2 font-semibold">{name}</h3>
                                            <p className="text-muted-foreground -mt-3 text-sm font-light text-wrap">{description}</p>
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="h-14 w-full md:col-start-2 md:row-start-5">
                    <PlusIcon />
                    Add
                </Button>
            </form>
        </Form>
    );
}
