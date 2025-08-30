"use client";

import { useEffect, useState } from "react";

export default function useKeyboardOpen() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const handleFocusIn = (e: FocusEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                setIsKeyboardOpen(true);
            }
        };

        const handleFocusOut = (e: FocusEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                setIsKeyboardOpen(false);
            }
        };

        window.addEventListener("focusin", handleFocusIn);
        window.addEventListener("focusout", handleFocusOut);

        // Extra: detect keyboard toggle via viewport resize
        const viewport = window.visualViewport;
        const onResize = () => {
            if (!viewport) return;
            // keyboard is considered open if viewport height < window.innerHeight
            const keyboardVisible = viewport.height < window.innerHeight - 100; // 100px threshold
            setIsKeyboardOpen(keyboardVisible);
        };

        viewport?.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("focusin", handleFocusIn);
            window.removeEventListener("focusout", handleFocusOut);
            viewport?.removeEventListener("resize", onResize);
        };
    }, []);

    return { isKeyboardOpen };
}
