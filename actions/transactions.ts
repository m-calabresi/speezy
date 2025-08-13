import type { RawTransaction, Transaction } from "@/types/transaction";

import sql from "@/lib/db";

export async function getTransactions() {
    const transactions = await sql<RawTransaction[]>`
        SELECT id, transaction_at, amount, description, is_loan
        FROM transactions
        ORDER BY transaction_at DESC;`;

    return transactions.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
}
