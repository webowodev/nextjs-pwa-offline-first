'use client';

import InstallPrompt from "./installPrompt";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         registerServiceWorker().then();
    //     }
    // }, []);

    // async function registerServiceWorker() {
    //     console.info('Registering service worker');
    //     try {
    //         await navigator.serviceWorker.register('/sw.js', {
    //             scope: '/',
    //             updateViaCache: "none",
    //         });
    //         console.info('Service worker registered successfully');
    //     } catch (error) {
    //         console.warn('Service worker registration failed:', error);
    //     }
    // }
    return (
        <>
            <InstallPrompt />
            {children}
        </>
    );
}