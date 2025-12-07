"use client";

import { SearchIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { FilterForm } from "@/components/forms/filter-form";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ActionBar({ className, ...props }: React.ComponentProps<"div">) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section
            {...props}
            className={cn("w-full", className)}>
            <div className="flex w-full flex-row items-center gap-3">
                <div className="relative w-full">
                    <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search transaction..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-card border-border h-12 rounded-xl pl-10"
                    />
                    {/* TODO: implement search */}
                    {searchQuery && (
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
                            onClick={() => setSearchQuery("")}>
                            <XIcon className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"icon-lg"}
                            className="text-muted-foreground size-12 rounded-xl">
                            <SlidersHorizontalIcon className="size-6" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Filter transactions</DrawerTitle>
                            <DrawerDescription className="sr-only">Filter the displayed transactions using the following controls.</DrawerDescription>
                        </DrawerHeader>
                        <FilterForm className="scrollbar-hidden overflow-auto px-4">
                            <DrawerFooter className="px-0">
                                <Button
                                    type="submit"
                                    className="w-full">
                                    Apply Filters
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </FilterForm>
                    </DrawerContent>
                </Drawer>
            </div>
        </section>
    );
}
