import { CalendarIcon, CheckIcon, CircleIcon, CoinsIcon, EllipsisVerticalIcon, EuroIcon, HandHelpingIcon, ShoppingBagIcon, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction, TransactionType } from "@/types/transaction";

const transactionTypeOptions: { [key in TransactionType]: { name: string; isNegative: boolean; isPending: boolean | undefined; Icon: LucideIcon } } = {
    expense: { name: "Spesa", isNegative: true, isPending: undefined, Icon: ShoppingBagIcon },
    earning: { name: "Entrata", isNegative: false, isPending: undefined, Icon: EuroIcon },
    lendPending: { name: "Hai prestato", isNegative: true, isPending: true, Icon: HandHelpingIcon },
    lendFulfill: { name: "Prestito riscosso", isNegative: true, isPending: false, Icon: HandHelpingIcon },
    borrowPending: { name: "Devi ridare", isNegative: false, isPending: true, Icon: CoinsIcon },
    borrowFulfill: { name: "Debito ripagato", isNegative: false, isPending: false, Icon: CoinsIcon },
};

export function TransactionItem({ item }: { item: Transaction }) {
    const option = transactionTypeOptions[item.type];

    const amount = option.isNegative ? item.amount * -1 : item.amount;
    const [integerAmount, decimalAmount] = formatCurrency(amount).split(",");

    return (
        <Card
            className={cn(
                option.isPending === undefined && "bg-background dark:bg-card",
                option.isPending !== undefined && option.isPending && "border-amber-100/10 bg-linear-to-r from-amber-100/4 to-amber-100/5",
                option.isPending !== undefined && !option.isPending && "bg-background dark:bg-card/20",
            )}>
            <CardContent className="grid grid-cols-[min-content_auto_min-content_min-content] grid-rows-[min-content_auto] items-start gap-x-4 gap-y-2">
                <div
                    className={cn(
                        "row-span-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border",
                        option.isPending === undefined && "bg-background dark:bg-card text-muted-foreground",
                        option.isPending !== undefined && option.isPending && "border-amber-100/20 text-amber-100",
                        option.isPending !== undefined && !option.isPending && "bg-background dark:bg-card text-muted-foreground/40",
                    )}>
                    <option.Icon className="size-5" />
                </div>
                <h3
                    className={cn(
                        "text-lg leading-tight font-medium",
                        option.isPending === undefined && "text-card-foreground",
                        option.isPending !== undefined && option.isPending && "text-amber-50",
                        option.isPending !== undefined && !option.isPending && "text-muted-foreground/40",
                    )}>
                    {item.description}
                </h3>
                <div
                    className={cn(
                        "flex shrink-0 flex-row items-start justify-end gap-0.5 justify-self-end",
                        option.isPending === undefined && option.isNegative && "text-card-foreground",
                        option.isPending === undefined && !option.isNegative && "text-success-foreground",
                        option.isPending !== undefined && option.isPending && "text-amber-100",
                        option.isPending !== undefined && !option.isPending && "text-muted-foreground/40",
                    )}>
                    <span className="text-xl font-bold">{integerAmount}</span>
                    <span className="text-sm font-medium">,{decimalAmount}</span>
                </div>
                <Button
                    variant={"ghost"}
                    size={"icon"}>
                    <EllipsisVerticalIcon className="size-5" />
                </Button>
                <div
                    className={cn(
                        "col-span-2 flex flex-row items-center justify-start gap-2",
                        option.isPending === undefined && "text-muted-foreground",
                        option.isPending !== undefined && option.isPending && "text-amber-100/60",
                        option.isPending !== undefined && !option.isPending && "text-muted-foreground/40",
                    )}>
                    <CalendarIcon className="mb-1 h-4 w-4" />
                    <span className="text-sm font-medium">{formatDate(item.transactionAt)}</span>
                    {option.isPending !== undefined && (
                        <>
                            {option.isPending && (
                                <Badge
                                    variant="warning"
                                    className="rounded-full">
                                    <CircleIcon className="size-3" />
                                    {option.name}
                                </Badge>
                            )}
                            {!option.isPending && (
                                <Badge
                                    variant="outline"
                                    className="text-foreground/70 rounded-full">
                                    <CheckIcon className="size-3" />
                                    {option.name}
                                </Badge>
                            )}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
