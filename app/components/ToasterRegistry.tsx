"use client";

import { Toaster } from "sonner";

export default function ToasterRegistry() {
    return (
        <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="light"
            style={{ fontFamily: 'inherit' }}
        />
    );
}
