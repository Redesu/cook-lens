'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowDownToLine, Share, PlusSquare, ChefHat } from 'lucide-react';
import { BeforeInstallPromptEvent, Navigator } from '@/types';

const isIOS = () => {
    if (typeof window === 'undefined') return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /ipod|iphone|ipad/.test(userAgent);
};

export default function InstallPrompt() {
    const [isVisible, setIsVisible] = useState(false);
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            const evt = e as BeforeInstallPromptEvent;
            evt.preventDefault();
            if (sessionStorage.getItem('installPromptDismissed') !== 'true') {
                setInstallPrompt(evt);
                setIsVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        if (
            isIOS() &&
            !(window.navigator as Navigator).standalone &&
            sessionStorage.getItem('installPromptDismissed') !== 'true'
        ) {
            setIsVisible(true);
            setShowIOSInstructions(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('installPromptDismissed', 'true');
    };

    const handleInstall = async () => {
        if (!installPrompt) return;

        await installPrompt.prompt();

        setInstallPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    if (showIOSInstructions) {
        return (
            <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto p-4 bg-white rounded-lg shadow-xl z-50 animate-slide-up">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg mt-1">
                        <ChefHat className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Install Cook Lens</h4>
                        <p className="text-sm text-gray-600">
                            To install, tap the Share icon
                            <Share className="inline-block w-4 h-4 mx-1" />
                            and then &apos;Add to Home Screen&apos;
                            <PlusSquare className="inline-block w-4 h-4 ml-1" />.
                        </p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        aria-label="Dismiss"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto p-4 bg-white rounded-lg shadow-xl z-50 animate-slide-up">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                        <ChefHat className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Install Cook Lens</h4>
                        <p className="text-sm text-gray-600">Add Cook Lens to your home screen</p>
                    </div>
                </div>

                <div className="flex flex-shrink-0 items-center space-x-3">
                    <button
                        onClick={handleDismiss}
                        className="font-medium text-sm text-gray-600 hover:text-gray-800 cursor-pointer flex items-center"
                    >
                        No Thanks
                    </button>
                    <button
                        onClick={handleInstall}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer flex items-center"
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        Install
                    </button>
                </div>
            </div>
        </div>
    );
}
