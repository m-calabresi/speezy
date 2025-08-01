import { ModeToggle } from "@/components/mode-toggle";
import ReleaseInfo from "@/components/release-info";

export default function Home() {
    return (
        <>
            <div className="font-bricolage-grotesque text-4xl font-medium">speezy</div>
            <ReleaseInfo />
            <ModeToggle />
        </>
    );
}
