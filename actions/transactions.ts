import sql from "@/lib/db";
import type { RawTransaction, Transaction } from "@/types/transaction";

export async function getTransactions() {
    const transactions = await sql<RawTransaction[]>`
        SELECT id, transaction_at, amount, description, is_loan
        FROM transactions
        ORDER BY transaction_at DESC;`;

    return transactions.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
}
