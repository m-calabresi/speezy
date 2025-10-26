import type { Metadata } from "next";

import ComingSoon from "@/components/coming-soon";
import ReleaseInfo from "@/components/release-info";
import { PageProvider } from "@/providers/page-provider";

export const metadata: Metadata = {
    title: "Stats - speezy",
    description: "Your stats and reports at a glance.",
    keywords: ["speezy", "status", "statistics", "expense", "tracking"],
};

export default function Stats() {
    return (
        <PageProvider path="/stats">
            <ComingSoon />
            <ReleaseInfo className="mb-5 md:mb-3 xl:mb-5" />
        </PageProvider>
    );
}
