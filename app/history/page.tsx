import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { TransactionList } from "@/app/history/transaction-list";
import { getQueryClient } from "@/lib/get-query-client";
import { PageProvider } from "@/providers/page-provider";
import { getTransactions } from "@/queries/transactions";
import type { Paginated } from "@/types/pagination";
import type { Transaction } from "@/types/transaction";

export const metadata: Metadata = {
    title: "Stats - speezy",
    description: "Your transaction history at a glance.",
    keywords: ["speezy", "history", "transactions", "expense", "tracking"],
};

export default async function History() {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: ({ pageParam }) => getTransactions(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage: Paginated<Transaction[]>) => lastPage.nextCursor,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageProvider
                path="/history"
                className="mb-0 h-full w-full overflow-hidden md:mb-0 lg:mb-0">
                <article className="h-full w-full pl-0 xl:pl-32">
                    <TransactionList />
                </article>
            </PageProvider>
        </HydrationBoundary>
    );
}
