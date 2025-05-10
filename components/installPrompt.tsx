'use client';

import { useEffect, useState } from "react";

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (isStandalone) {
        return null // Don't show install button if already installed
    }

    function unregisterServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.unregister().then((boolean) => {
                        if (boolean) {
                            console.log('Service worker unregistered successfully');
                        } else {
                            console.log('Service worker unregistration failed');
                        }
                    }).catch((error) => {
                        console.error('Service worker unregistration failed:', error);
                    });
                }
            }).catch((error) => {
                console.error('Error getting service worker registrations:', error);
            });
        }
    }

    return (
        <div>
            <h3>Install App</h3>
            <button>Add to Home Screen</button>
            {isIOS && (
                <p>
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon">
                        {' '}
                        ⎋{' '}
                    </span>
                    and then {'"Add to Home Screen"'}
                    <span role="img" aria-label="plus icon">
                        {' '}
                        ➕{' '}
                    </span>.
                </p>
            )}

            <div>
                <button className={'bg-red p-4'} onClick={unregisterServiceWorker}>
                    Unregister Service Worker
                </button>
            </div>
        </div>
    )
}