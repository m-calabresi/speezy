import type { Paginated } from "@/types/pagination";
import type { ApiTransaction, Transaction } from "@/types/transaction";

export async function getTransactions(pageParam: number = 0) {
    const response = await fetch(`/api/transactions?cursor=${pageParam}`);
    const data = (await response.json()) as Paginated<ApiTransaction[]>;

    const transactions = data.content.map((t) => ({ ...t, transactionAt: new Date(t.transactionAt) }) as Transaction);

    return { nextCursor: data.nextCursor, content: transactions } as Paginated<Transaction[]>;
}
