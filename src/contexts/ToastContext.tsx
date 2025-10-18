'use client';

import { toastContextType, ToastType } from "@/types";
import { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "@/types";
import { BanIcon, CheckCircleIcon, CircleAlertIcon, InfoIcon, X } from "lucide-react";

const ToastContext = createContext<toastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = `${Date.now()}`;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    border: 'border-green-500',
                    icon: 'text-green-500',
                };
            case 'warning':
                return {
                    border: 'border-yellow-500',
                    icon: 'text-yellow-500',
                };
            case 'info':
                return {
                    border: 'border-blue-500',
                    icon: 'text-blue-500',
                };
            case 'error':
                return {
                    border: 'border-red-500',
                    icon: 'text-red-500',
                };
        }
    };

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="w-5 h-5" />;
            case 'warning':
                return <CircleAlertIcon className="w-5 h-5" />;
            case 'info':
                return <InfoIcon className="w-5 h-5" />;
            case 'error':
                return <BanIcon className="w-5 h-5" />
        }
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => {
                    const styles = getToastStyles(toast.type);

                    return (
                        <div
                            key={toast.id}
                            className={`
                                flex items-center gap-3
                                bg-white dark:bg-gray-800
                                text-gray-900 dark:text-gray-100
                                px-4 py-3
                                rounded-md
                                shadow-md
                                border border-gray-200 dark:border-gray-700
                                border-l-4
                                ${styles.border} 
                                min-w-[300px]
                                max-w-md
                                animate-slide-in
                            `}
                        >
                            <div className={styles.icon}>
                                {getToastIcon(toast.type)}
                            </div>

                            <p className="flex-1 text-sm font-medium">{toast.message}</p>

                            <button
                                onClick={() => dismissToast(toast.id)}
                                className="
                                    p-1
                                    text-gray-400 dark:text-gray-500
                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                    rounded-full
                                    transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600
                                "
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}