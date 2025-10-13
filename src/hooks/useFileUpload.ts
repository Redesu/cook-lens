import { UseFileUploadReturn } from "@/types/DTOs/useFileUploadReturn";
import { ChangeEvent, useRef } from "react";

export function useFileUpload(): UseFileUploadReturn {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): Promise<string | null> => {
        return new Promise((resolve) => {
            const file = e.target.files?.[0];

            if (!file) {
                resolve(null);
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    resolve(event.target.result as string);
                } else {
                    resolve(null);
                }
            };

            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    return {
        fileInputRef,
        handleFileUpload,
        triggerFileInput
    };
}