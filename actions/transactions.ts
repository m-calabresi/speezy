import type { RawTransaction, Transaction } from "@/types/transaction";

import sql from "@/lib/db";

export async function getTransactions() {
    const userId = "292a485f-a56a-4938-8f1a-bbbbbbbbbbb2"; // TODO: replace with auth

    const transactions = await sql<RawTransaction[]>`
        SELECT id, transaction_at, amount, description, type
        FROM transaction
        WHERE user_id=${userId}
        ORDER BY transaction_at DESC;`;

    return transactions.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
}
