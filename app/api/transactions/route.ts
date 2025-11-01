import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import sql from "@/lib/db";
import type { Paginated } from "@/types/pagination";
import { transactionTypes, type RawTransaction, type Transaction } from "@/types/transaction";

const pageSize = 10;

function getCursor(cursorParam: string | null) {
    if (cursorParam == null) return 0;

    try {
        return parseInt(cursorParam);
    } catch {
        return 0;
    }
}

export const GET = auth(async (request) => {
    if (!request.auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = "292a485f-a56a-4938-8f1a-bbbbbbbbbbb2"; // TODO: retrieve from request.auth
    const cursor = getCursor(request.nextUrl.searchParams.get("cursor"));

    try {
        const data = await sql<RawTransaction[]>`
        SELECT id, transaction_at, amount, description, type
        FROM transaction
        WHERE user_id=${userId}
        ORDER BY transaction_at DESC, created_at DESC
        LIMIT ${pageSize}
        OFFSET ${cursor * pageSize};`;

        const transactions = data.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
        const nextCursor = transactions.length === pageSize ? cursor + 1 : null;

        const response: Paginated<Transaction[]> = { content: transactions, nextCursor };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
});

export const POST = auth(async (request) => {
    if (!request.auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const schema = z.strictObject({
        transactionAt: z.string().pipe(z.coerce.date({ error: "Seleziona la data della transazione." })),
        amount: z.number({ error: "Inserisci un importo valido." }).positive({ error: "Inserisci un importo positivo." }),
        description: z.string().min(1, { error: "Inserisci una descrizione." }).max(100, { error: "La descrizione non deve superare i 100 caratteri." }),
        type: z.enum(transactionTypes, { error: "Seleziona un tipo di transazione valido" }),
    });

    const validatedFields = schema.safeParse(data);

    if (!validatedFields.success) {
        console.error(z.prettifyError(validatedFields.error));
        return NextResponse.json({ message: validatedFields.error.issues.flatMap((issue) => issue.message).join(" ") }, { status: 400 });
    }

    const userId = "292a485f-a56a-4938-8f1a-bbbbbbbbbbb2"; // TODO: retrieve from request.auth
    try {
        const result = await sql<RawTransaction[]>`
        INSERT INTO transaction (user_id, transaction_at, amount, description, type)
            VALUES (${userId}, ${validatedFields.data.transactionAt}, ${validatedFields.data.amount}, ${validatedFields.data.description}, ${validatedFields.data.type})
        RETURNING id, transaction_at, amount, description, type;`;

        const transactions = result.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
        return NextResponse.json({ ...transactions[0] }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
});
