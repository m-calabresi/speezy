"use client";

import { ChartPie, History, Plus } from "lucide-react";
import Link from "next/link";

import useKeyboardOpen from "@/hooks/use-keyboard-open";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
    { id: "add", url: "/", label: "Add", Icon: Plus },
    { id: "history", url: "/history", label: "History", Icon: History },
    { id: "stats", url: "/stats", label: "Stats", Icon: ChartPie },
];

export default function Navigation() {
    const { isKeyboardOpen } = useKeyboardOpen();
    const pathName = usePathname();

    return (
        <nav
            className={cn(
                "bg-background bottom-safe-offset-0 fixed right-0 left-0 z-40 w-full py-3 transition-transform duration-200 ease-in-out md:left-1/2 md:mb-3 md:h-max md:w-max md:-translate-x-1/2 md:rounded-full md:px-2 md:shadow xl:top-0 xl:right-auto xl:bottom-auto xl:left-0 xl:mb-0 xl:ml-5 xl:translate-x-0 xl:translate-y-20 xl:px-0 xl:py-7",
                isKeyboardOpen && "translate-y-full",
            )}>
            <ul className="mx-auto flex max-w-md items-center justify-around md:max-w-max xl:flex-col xl:gap-12">
                {navItems.map(({ id, url, label, Icon }) => {
                    const isActive = pathName === url;
                    return (
                        <li
                            key={id}
                            className={cn("text-secondary-foreground group px-5", isActive && "text-muted-foreground")}>
                            <Link
                                href={url}
                                className="flex min-w-[60px] flex-col items-center justify-center">
                                <div
                                    className={cn(
                                        "group-hover:bg-secondary mb-2 flex w-16 items-center justify-center rounded-full py-1.5 transition-colors duration-100 ease-in-out",
                                        isActive && "bg-secondary",
                                    )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-medium">{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
