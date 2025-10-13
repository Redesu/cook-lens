import { RefObject } from "react";

export interface UseCameraReturn {
    isCameraOpen: boolean;
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    openCamera: () => Promise<void>;
    capturePhoto: () => string | null;
    closeCamera: () => void;
}