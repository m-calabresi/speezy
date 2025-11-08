"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle, ShoppingBagIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import { TransactionItem } from "@/app/history/transaction-item";
import { Button } from "@/components/ui/button";
import { getTransactions } from "@/queries/transactions";

export function TransactionList() {
    const { data, isPending, error, refetch, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: ({ pageParam }) => getTransactions(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const rootRef = useRef<HTMLDivElement>(null);

    // BUG: see https://github.com/facebook/react/issues/34775
    const { ref, inView } = useInView({ root: rootRef.current, threshold: 0, rootMargin: "500px 0px" }); // eslint-disable-line react-hooks/refs

    useEffect(() => {
        if (!inView || isFetching || isFetchingNextPage || !hasNextPage) return;
        fetchNextPage();
    }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
    // TODO: update to useEffectEvent

    if (error) {
        console.error(error);
        // TODO: update style
        return (
            <div>
                Error <Button onClick={() => refetch()}>Retry</Button>
            </div>
        );
    }

    // TODO: update style
    if (isPending) return <div>Loading...</div>;

    const transactions = data.pages.flatMap((page) => page.content);
    if (transactions.length === 0) return <span>No Transactions</span>;

    return (
        <div
            ref={rootRef}
            className="scrollbar-hidden h-full w-full divide-y-8 divide-transparent overflow-auto">
            <ul className="w-full divide-y-8 divide-transparent">
                {transactions.map((t) => (
                    <li key={t.id}>
                        <TransactionItem item={t} />
                    </li>
                ))}
            </ul>
            <div
                className="text-muted-foreground mb-[5rem] grid place-items-center py-10 text-sm font-normal md:mb-[5.75rem] xl:mb-0"
                ref={ref}>
                <div className="flex flex-row items-center justify-center gap-2">
                    {hasNextPage && (
                        <>
                            <LoaderCircle className="size-4 animate-spin" />
                            <span>Loading more...</span>
                        </>
                    )}
                    {!hasNextPage && (
                        <>
                            <ShoppingBagIcon className="size-4" />
                            <span>No more transactions</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
