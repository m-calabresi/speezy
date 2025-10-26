import { NextResponse } from "next/server";

import { auth } from "@/auth";
import sql from "@/lib/db";
import type { Paginated } from "@/types/pagination";
import type { RawTransaction, Transaction } from "@/types/transaction";

const pageSize = 10;

function getCursor(cursorParam: string | null) {
    if (cursorParam == null) return 0;

    try {
        return parseInt(cursorParam);
    } catch {
        return 0;
    }
}

export const GET = auth(async (req) => {
    if (!req.auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = "292a485f-a56a-4938-8f1a-bbbbbbbbbbb2"; // TODO: retrieve from req.auth
    const cursor = getCursor(req.nextUrl.searchParams.get("cursor"));

    const data = await sql<RawTransaction[]>`
        SELECT id, transaction_at, amount, description, type
        FROM transaction
        WHERE user_id=${userId}
        ORDER BY transaction_at DESC
        LIMIT ${pageSize}
        OFFSET ${cursor * pageSize};`;

    const transactions = data.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
    const nextCursor = transactions.length === pageSize ? cursor + 1 : null;

    const response: Paginated<Transaction[]> = { content: transactions, nextCursor };

    return NextResponse.json(response, { status: 200 });
});
