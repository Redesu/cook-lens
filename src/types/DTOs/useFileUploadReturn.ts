import { RefObject } from "react";

export interface UseFileUploadReturn {
    fileInputRef: RefObject<HTMLInputElement | null>;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | null>;
    triggerFileInput: () => void;
}