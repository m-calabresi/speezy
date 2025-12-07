"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { nullableCurrencyString } from "@/app/schemas/zod";
import { CurrencyInput } from "@/components/inputs/currency-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, formatCurrency } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import type React from "react";

const presetAmountValues = ["all", "under-20", "between-20-100", "over-100", "custom"] as const;
type PresetAmountValue = (typeof presetAmountValues)[number];

type PresetAmount = {
    value: PresetAmountValue;
    label: string;
    min: number | null;
    max: number | null;
};

const presetAmounts: PresetAmount[] = [
    { value: "all", label: "All", min: null, max: null },
    { value: "under-20", label: "Under €20", min: null, max: 20 },
    { value: "between-20-100", label: "€20 - €100", min: 20, max: 100 },
    { value: "over-100", label: "Over €100", min: 100, max: null },
    { value: "custom", label: "Custom", min: null, max: null },
];

const FilterSchema = z.object({
    presetAmount: z.enum(presetAmountValues),
    minAmount: nullableCurrencyString,
    maxAmount: nullableCurrencyString,
});

type FilterForm = z.infer<typeof FilterSchema>;

export function FilterForm({ children, className }: React.ComponentProps<"form">) {
    const form = useForm<FilterForm>({
        resolver: zodResolver(FilterSchema, undefined, { raw: true }),
        defaultValues: {
            presetAmount: "all",
        },
    });

    const presetAmount = form.watch("presetAmount");

    const onPresetAmountChange = (presetValue: FilterForm["presetAmount"]) => {
        form.setValue("presetAmount", presetValue);

        if (presetValue === "custom") return;

        const preset = presetAmounts.find(({ value }) => value === presetValue);
        const min = preset?.min ? formatCurrency(preset.min, { displayCurrencySign: false, displayCurrencySymbol: false }) : "";
        const max = preset?.max ? formatCurrency(preset.max, { displayCurrencySign: false, displayCurrencySymbol: false }) : "";

        form.setValue("minAmount", min);
        form.setValue("maxAmount", max);
    };

    function onSubmit(data: FilterForm) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("space-y-6", className)}>
                <FormField
                    control={form.control}
                    name="presetAmount"
                    render={({ field }) => (
                        <FormItem className="mb-0">
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type="single"
                                    variant={"outline"}
                                    {...field}
                                    value={field.value}
                                    onValueChange={(val) => val && onPresetAmountChange(val as FilterForm["presetAmount"])}
                                    className="mt-2 flex w-full flex-col gap-2">
                                    {presetAmounts.map((preset) => (
                                        <ToggleGroupItem
                                            key={preset.value}
                                            value={preset.value}
                                            className={cn(
                                                "group data-[state=on]:bg-accent/20 hover:bg-accent/20 flex w-full flex-col items-start justify-between rounded-md p-4 text-left text-sm font-normal transition-colors",
                                                preset.value === "custom" && "data-[state=on]:rounded-b-none data-[state=on]:border-b-0",
                                            )}>
                                            <div className="flex w-full items-center justify-between">
                                                {preset.label}
                                                <CheckIcon className="size-4 opacity-0 transition-opacity group-data-[state=on]:opacity-100" />
                                            </div>
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {presetAmount === "custom" && (
                    <div className="bg-accent/20 mb-0 grid grid-cols-2 gap-2 rounded rounded-t-none border border-t-0 px-4 pb-4">
                        <FormField
                            control={form.control}
                            name="minAmount"
                            render={({ field: { onChange, onBlur, value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Min</FormLabel>
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
                            name="maxAmount"
                            render={({ field: { onChange, onBlur, value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Min</FormLabel>
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
                    </div>
                )}
                {children}
            </form>
            {/* TODO: add status and date filters */}
        </Form>
    );
}
