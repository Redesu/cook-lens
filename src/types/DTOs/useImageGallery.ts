export interface UseGalleryReturn {
    capturedImage: string | null;
    uploadedImage: string | null;
    setCapturedImage: (image: string | null) => void;
    setUploadedImage: (image: string | null) => void;
    clearAllImages: () => void;
}