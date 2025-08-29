import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalBodyOption, ModalBodyOptionGroup, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal";
import { buildNumber } from "@/lib/release";

export function AboutModal() {
    return (
        <Modal>
            <ModalTrigger asChild>
                <Button
                    variant="link"
                    className="text-sm font-normal">
                    About
                </Button>
            </ModalTrigger>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>About speezy</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ModalBodyOptionGroup>
                        <ModalBodyOption className="flex items-center justify-start">
                            <span className="flex-1 text-left font-medium">Release</span>
                            <span className="text-muted-foreground font-mono font-normal">{buildNumber}</span>
                        </ModalBodyOption>
                        <ModalBodyOption className="flex items-center justify-start">
                            <span className="flex-1 text-left font-medium">Author</span>
                            <Link
                                className="text-muted-foreground font-mono font-normal underline underline-offset-4"
                                href="https://www.linkedin.com/in/mcalabresi/"
                                target="_blank"
                                rel="noopener noreferrer">
                                @m-calabresi
                            </Link>
                        </ModalBodyOption>
                        <ModalBodyOption className="flex items-center justify-start">
                            <span className="flex-1 text-left font-medium">License</span>
                            <Link
                                className="text-muted-foreground font-mono font-normal underline underline-offset-4"
                                href="https://github.com/m-calabresi/speezy/blob/main/LICENSE"
                                target="_blank"
                                rel="noopener noreferrer">
                                MPL-2.0 license
                            </Link>
                        </ModalBodyOption>
                    </ModalBodyOptionGroup>
                </ModalBody>
                <ModalFooter className="text-muted-foreground flex-row items-center justify-center text-sm sm:flex-row sm:justify-center">© Copyright {new Date().getFullYear()} speezy</ModalFooter>
            </ModalContent>
        </Modal>
    );
}
