import type { Paginated } from "@/types/pagination";
import type { ApiTransaction, Transaction } from "@/types/transaction";

export async function getTransactions(pageParam: number = 0) {
    const response = await fetch(`/api/transactions?cursor=${pageParam}`);
    const dataOrError = await response.json();

    if (response.status !== 200) throw dataOrError.message as string;

    const transactions = (dataOrError as Paginated<ApiTransaction[]>).content.map((t) => ({ ...t, transactionAt: new Date(t.transactionAt) }) as Transaction);
    return { nextCursor: dataOrError.nextCursor, content: transactions } as Paginated<Transaction[]>;
}

export async function addTransaction(transaction: Omit<Transaction, "id">) {
    const response = await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(transaction) });
    const transactionOrError = await response.json();

    if (response.status !== 200) throw transactionOrError.message as string;
    return { ...(transactionOrError as ApiTransaction), transactionAt: new Date((transactionOrError as ApiTransaction).transactionAt) } as Transaction;
}
