import { AboutModal } from "@/components/modals/about";
import { ThemeToggleModal } from "@/components/modals/theme-toggle";
import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalBodyOption, ModalBodyOptionGroup, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal";
import { UserAvatar } from "@/components/user-avatar";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function ProfileModal() {
    const session = {
        firstName: "Demo",
        lastName: "User",
        fullName: "Demo User",
        email: "demo.user@emai.com",
        image: "#",
    };
    const userInitials = `${session.firstName[0]}${session.lastName[0]}`;

    return (
        <Modal>
            <ModalTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full">
                    <UserAvatar
                        image={session.image || "#"}
                        fallback={userInitials}
                    />
                </Button>
            </ModalTrigger>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle className="font-bricolage-grotesque text-3xl font-medium">speezy</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ModalBodyOptionGroup className="py-6">
                        <ModalBodyOption className="flex items-center gap-4">
                            <UserAvatar
                                image={session.image || "#"}
                                fallback={userInitials}
                                className="h-14 w-14"
                            />
                            <article>
                                <h3 className="text-foreground text-lg font-medium">{session.fullName}</h3>
                                <p className="text-muted-foreground text-sm">{session.email}</p>
                            </article>
                        </ModalBodyOption>
                    </ModalBodyOptionGroup>
                    <ModalBodyOptionGroup>
                        <ModalBodyOption>
                            <ThemeToggleModal className="h-full w-full" />
                        </ModalBodyOption>
                        <ModalBodyOption>
                            <ModalClose asChild>
                                <span className="flex h-full w-full items-center justify-start">
                                    <LogOutIcon className="mr-4 h-5 w-5" />
                                    <span className="text-left">Sign Out</span>
                                </span>
                            </ModalClose>
                        </ModalBodyOption>
                    </ModalBodyOptionGroup>
                </ModalBody>
                <ModalFooter className="flex-row items-center justify-center gap-2 sm:flex-row sm:justify-center">
                    <AboutModal />
                    <span className="text-primary">•</span>
                    <Button
                        variant="link"
                        asChild
                        className="text-sm font-normal">
                        <Link
                            href="https://github.com/m-calabresi/speezy"
                            target="_blank"
                            rel="noopener noreferrer">
                            GitHub
                        </Link>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
