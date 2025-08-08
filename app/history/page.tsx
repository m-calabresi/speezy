import { getTransactions } from "@/actions/transactions";
import ReleaseInfo from "@/components/release-info";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { PageProvider } from "@/providers/page-provider";
import type { Transaction } from "@/types/transaction";
import { CalendarIcon, CreditCardIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stats - speezy",
    description: "Your transaction history at a glance.",
    keywords: ["speezy", "history", "transactions", "expense", "tracking"],
};

function TransactionItem({ item }: { item: Transaction }) {
    const [integerAmount, decimalAmount] = formatCurrency(item.amount).split(",");
    const isExpense = item.amount < 0;
    return (
        <Card>
            <CardContent className="grid grid-cols-[min-content_auto_min-content] grid-rows-[min-content_auto] items-start gap-x-4 gap-y-2">
                <div className="bg-background dark:bg-card text-muted-foreground row-span-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                    <CreditCardIcon className="h-5 w-5" />
                </div>
                <h3 className="text-card-foreground text-lg leading-tight font-medium">{item.description}</h3>
                <div className={cn("flex shrink-0 flex-row items-start justify-end gap-0.5 justify-self-end", isExpense ? "text-card-foreground" : "text-success-foreground")}>
                    <span className="text-xl font-bold">{integerAmount}</span>
                    <span className="text-sm font-medium">{decimalAmount}</span>
                </div>
                <div className="col-span-2 flex flex-row items-center justify-start gap-2">
                    <CalendarIcon className="text-muted-foreground mb-1 h-4 w-4" />
                    <span className="text-muted-foreground text-sm font-medium">{formatDate(item.transactionAt)}</span>
                    {item.isLoan && (
                        <Badge
                            variant="secondary"
                            className="rounded-full">
                            Prestito
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default async function Home() {
    const transactions = await getTransactions(); // TODO: move this after auth

    return (
        <PageProvider path="/history">
            <article className="h-[1000px] w-full">
                {transactions.length !== 0 && (
                    <ul className="divide-background w-full divide-y-8">
                        {transactions.map((t) => (
                            <li key={t.id}>
                                <TransactionItem item={t} />
                            </li>
                        ))}
                    </ul>
                )}
                {transactions.length === 0 && <span>No Transactions</span>}
            </article>
            <ReleaseInfo />
        </PageProvider>
    );
}
