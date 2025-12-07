"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CoinsIcon, EuroIcon, HandHelpingIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { currencyString } from "@/app/schemas/zod";
import { CurrencyInput } from "@/components/inputs/currency-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalize, formatDate, formatTransaction } from "@/lib/utils";
import { addTransaction } from "@/queries/transactions";
import { transactionTypes, type Transaction, type TransactionOption } from "@/types/transaction";

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
    transactionAt: z.date({ error: "Seleziona la data della transazione." }),
    amount: currencyString,
    description: z.string().min(1, { error: "Inserisci una descrizione." }).max(1000, { error: "La descrizione non deve superare i 100 caratteri." }),
    type: z.enum(transactionTypes, { error: "Seleziona un tipo di transazione valido" }),
});

export function TransactionForm() {
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
        // distinguish same day transactions by time
        const now = new Date();
        raw.transactionAt.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

        const data: Omit<Transaction, "id"> = {
            ...raw,
            transactionAt: raw.transactionAt,
            amount: parseFloat(raw.amount.replaceAll(".", "").replace(",", ".")),
            description: capitalize(raw.description.trim()),
        };

        try {
            await addTransaction(data);

            form.reset();
            toast.success(`${formatTransaction(raw.type, { action: "create" })}!`);
        } catch (error) {
            console.error(error);

            const message = typeof error === "string" ? error : "Si è verificato un problema, riprova.";
            toast.error(message);
        }
    }

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
                                            className="w-full items-center justify-start pl-3 text-left font-normal">
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
                    render={({ field: { onChange, onBlur, value, ...field } }) => (
                        <FormItem className="md:col-start-1 md:row-start-2">
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    value={value ?? ""}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    {...field}
                                />
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
