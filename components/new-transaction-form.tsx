"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, EuroIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const FormSchema = z.object({
    transactionDate: z.date({
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
});

export function NewTransactionForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema, undefined, { raw: true }),
        defaultValues: {
            transactionDate: new Date(),
            amount: "",
            description: "",
        },
    });

    function onSubmit(raw: z.infer<typeof FormSchema>) {
        const data = {
            ...raw,
            amount: parseFloat(raw.amount.replace(".", "").replace(",", ".")),
        };
        console.log({ raw, validated: data }); // TODO: submit transaction
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
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
                className="space-y-8">
                <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-[240px] items-center justify-start pl-3 text-left font-normal")}>
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
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="0.00"
                                        step="0.01"
                                        inputMode="decimal"
                                        type="text"
                                        className="w-[240px] ps-9"
                                        onInput={(e) => handleInput(e, onChange)}
                                        onChange={onChange}
                                        onBlur={(e) => {
                                            const raw = parseFloat(e.target.value.replace(/[^0-9,]/g, "").replace(",", "."));
                                            const formatted = isNaN(raw) ? "" : formatCurrency(raw, false, false);

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
                        <FormItem>
                            <FormLabel>Descrizione</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descrivi la transazione"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>{field.value.length}/100 caratteri</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
