import ComingSoon from "@/components/coming-soon";
import ReleaseInfo from "@/components/release-info";
import { PageProvider } from "@/providers/page-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stats - speezy",
    description: "Your stats and reports at a glance.",
    keywords: ["speezy", "status", "statistics", "expense", "tracking"],
};

export default function Stats() {
    return (
        <PageProvider path="/stats">
            <ComingSoon />
            <ReleaseInfo />
        </PageProvider>
    );
}
