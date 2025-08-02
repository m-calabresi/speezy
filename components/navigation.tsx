"use client";

import { cn } from "@/lib/utils";
import { ChartPie, History, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { id: "add", url: "/", label: "Add", Icon: Plus },
    { id: "history", url: "/history", label: "History", Icon: History },
    { id: "stats", url: "/stats", label: "Stats", Icon: ChartPie },
];

export default function Navigation() {
    const pathName = usePathname();

    return (
        <nav className="bg-background absolute bottom-0 z-40 w-full py-3">
            <ul className="mx-auto flex max-w-md items-center justify-around">
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
                                <span className={cn("text-xs font-medium", isActive && "")}>{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
