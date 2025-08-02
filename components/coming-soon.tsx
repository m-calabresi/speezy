import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PlaceholderImageDark from "@/public/placeholder-dark.svg";
import PlaceholderImageLight from "@/public/placeholder-light.svg";
import Image from "next/image";

export default function ComingSoon() {
    return (
        <article className="flex h-[1000px] flex-col items-center justify-start px-4 sm:px-6">
            <Card>
                <CardContent>
                    <Image
                        src={PlaceholderImageLight}
                        width={300}
                        height={200}
                        alt="Coming soon"
                        className="mx-auto block h-auto w-full max-w-xs rounded-lg sm:max-w-sm dark:hidden"
                    />
                    <Image
                        src={PlaceholderImageDark}
                        width={300}
                        height={200}
                        alt="Coming soon"
                        className="mx-auto hidden h-auto w-full max-w-xs rounded-lg sm:max-w-sm dark:block"
                    />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <h1 className="from-foreground to-secondary via-primary dark:from-primary dark:via-muted-foreground dark:to-foreground bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                        Coming Soon
                    </h1>
                    <p className="text-md text-muted-foreground">This page is under construction.</p>
                </CardFooter>
            </Card>
        </article>
    );
}
