import { UseGalleryReturn } from "@/types/DTOs/useImageGallery";
import { useState } from "react";

export function useImageGallery(): UseGalleryReturn {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);


    const clearAllImages = (): void => {
        setCapturedImage(null);
        setUploadedImage(null);
    }

    return {
        capturedImage,
        uploadedImage,
        setCapturedImage,
        setUploadedImage,
        clearAllImages
    }
}