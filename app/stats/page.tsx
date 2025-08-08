import ComingSoon from "@/components/coming-soon";
import ReleaseInfo from "@/components/release-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stats - speezy",
    description: "Your stats and reports at a glance.",
    keywords: ["speezy", "status", "statistics", "expense", "tracking"],
};

export default function Home() {
    return (
        <section>
            <ComingSoon />
            <ReleaseInfo />
        </section>
    );
}
