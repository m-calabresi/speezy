"use client";

import { useEffect, useState } from "react";

export default function useKeyboardOpen() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        // Detect keyboard toggle via viewport resize
        const viewport = window.visualViewport;
        const onResize = () => {
            if (!viewport) return;
            // keyboard is considered open if viewport height < window.innerHeight
            const keyboardVisible = viewport.height < window.innerHeight - 100; // 100px threshold
            setIsKeyboardOpen(keyboardVisible);
        };

        viewport?.addEventListener("resize", onResize);

        return () => {
            viewport?.removeEventListener("resize", onResize);
        };
    }, []);

    return { isKeyboardOpen };
}
