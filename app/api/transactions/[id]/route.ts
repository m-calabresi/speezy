import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import sql from "@/lib/db";
import { transactionTypes, type RawTransaction, type Transaction } from "@/types/transaction";
import type { NextAuthRequest } from "next-auth";

export const POST = auth(async (request: NextAuthRequest, { params }: { params: Promise<{ id: string }> }) => {
    if (!request.auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const schema = z.strictObject({
        id: z.string({ error: "Transazione sconosciuta." }),
        transactionAt: z.string().pipe(z.coerce.date({ error: "Seleziona la data della transazione." })),
        amount: z
            .number({ error: "Inserisci un importo valido." })
            .positive({ error: "Inserisci un importo positivo." })
            .lte(999999999.99, { error: "Inserisci un importo uguale o inferiore a €999.999.999,99." }),
        description: z.string().min(1, { error: "Inserisci una descrizione." }).max(100, { error: "La descrizione non deve superare i 100 caratteri." }),
        type: z.enum(transactionTypes, { error: "Seleziona un tipo di transazione valido" }),
    });

    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
        console.error(z.prettifyError(validatedFields.error));
        return NextResponse.json({ message: validatedFields.error.issues.flatMap((issue) => issue.message).join(" ") }, { status: 400 });
    }

    const userId = "292a485f-a56a-4938-8f1a-bbbbbbbbbbb2"; // TODO: retrieve from request.auth
    const { id: transactionId } = await params;
    try {
        const result = await sql<RawTransaction[]>`
            UPDATE transaction SET
                transaction_at = ${validatedFields.data.transactionAt},
                amount = ${validatedFields.data.amount},
                description = ${validatedFields.data.description},
                type = ${validatedFields.data.type}
            WHERE user_id = ${userId} AND id = ${transactionId}
            RETURNING id, transaction_at, amount, description, type;`;
        const transactions = result.map(({ amount, ...rest }) => ({ amount: parseFloat(amount), ...rest }) as Transaction);
        return NextResponse.json({ ...transactions[0] }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
});
