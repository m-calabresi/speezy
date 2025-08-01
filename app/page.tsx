import { ModeToggle } from "@/components/mode-toggle";
import ReleaseInfo from "@/components/release-info";

export default function Home() {
    return (
        <>
            <div className="font-bricolage-grotesque text-4xl font-medium">speezy</div>
            <ReleaseInfo />
            <ModeToggle />
            <div className="h-[1000px]">test</div>
            <div className="bg-primary text-primary-foreground">end test</div>
        </>
    );
}
