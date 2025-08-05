"use client";

import { MoonIcon, PaintbrushVerticalIcon, SmartphoneIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Modal, ModalAction, ModalBody, ModalBodyOption, ModalBodyOptionGroup, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal";
import type React from "react";

const themes = [
    { name: "light", Icon: SunIcon },
    { name: "dark", Icon: MoonIcon },
    { name: "system", Icon: SmartphoneIcon },
];

export function ThemeToggleModal({ ...props }: React.ComponentProps<typeof Button>) {
    const { theme: selectedTheme, setTheme } = useTheme();

    return (
        <Modal>
            <ModalTrigger asChild>
                <Button
                    variant="ghost"
                    {...props}>
                    <PaintbrushVerticalIcon className="mr-4 h-5 w-5" />
                    <span className="flex-1 text-left font-normal">Theme</span>
                    <span className="text-muted-foreground font-normal capitalize">{selectedTheme || "unknown"}</span>
                </Button>
            </ModalTrigger>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Theme</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ModalBodyOptionGroup>
                        {themes.map(({ name, Icon }) => (
                            <ModalBodyOption key={name}>
                                <ModalAction
                                    onClick={() => setTheme(name)}
                                    className="justify-start">
                                    <Icon className="mr-4 h-5 w-5" />
                                    <span className="flex-1 text-left capitalize">{name}</span>
                                    {selectedTheme === name && <span className="text-muted-foreground font-normal capitalize">selected</span>}
                                </ModalAction>
                            </ModalBodyOption>
                        ))}
                    </ModalBodyOptionGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
