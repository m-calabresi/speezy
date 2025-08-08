import ComingSoon from "@/components/coming-soon";
import ReleaseInfo from "@/components/release-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "New entry - speezy",
    description: "Add a new transaction to your expense tracking.",
    keywords: ["speezy", "new", "expense", "tracking"],
};

export default function Home() {
    return (
        <section>
            <ComingSoon />
            <ReleaseInfo />
        </section>
    );
}
