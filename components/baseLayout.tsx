'use client';

import { useEffect } from "react";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            registerServiceWorker()
        }
    }, []);

    async function registerServiceWorker() {
        await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: "none",
        });
    }
    return (
        <>
            {children}
        </>
    );
}