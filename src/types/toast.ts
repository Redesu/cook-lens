export type ToastType = "success" | "info" | "warning" | "error";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export interface toastContextType {
    showToast: (message: string, type: ToastType) => void;
}