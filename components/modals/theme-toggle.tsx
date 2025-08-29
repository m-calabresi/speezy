"use client";

import { MoonIcon, PaintbrushVerticalIcon, SmartphoneIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalBodyOption, ModalBodyOptionGroup, ModalClose, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal";

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
                <ModalBody className="pb-6">
                    <ModalBodyOptionGroup>
                        {themes.map(({ name, Icon }) => (
                            <ModalBodyOption key={name}>
                                <ModalClose
                                    onClick={() => setTheme(name)}
                                    asChild>
                                    <Button
                                        className="flex"
                                        variant="ghost">
                                        <Icon className="mr-4 h-5 w-5" />
                                        <span className="flex-1 text-left capitalize">{name}</span>
                                        {selectedTheme === name && <span className="text-muted-foreground font-normal capitalize">selected</span>}
                                    </Button>
                                </ModalClose>
                            </ModalBodyOption>
                        ))}
                    </ModalBodyOptionGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
