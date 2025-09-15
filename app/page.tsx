import type { Metadata } from "next";

import { NewTransactionForm } from "@/components/new-transaction-form";
import { PageProvider } from "@/providers/page-provider";
// TODO: remove this comment
export const metadata: Metadata = {
    title: "New entry - speezy",
    description: "Add a new transaction to your expense tracking.",
    keywords: ["speezy", "new", "expense", "tracking"],
};

export default function Home() {
    return (
        <PageProvider path="/">
            <NewTransactionForm />
        </PageProvider>
    );
}
