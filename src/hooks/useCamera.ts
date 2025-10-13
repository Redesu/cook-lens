import { UseCameraReturn } from "@/types/DTOs/useCameraReturn";
import { useRef, useState } from "react";

export function useCamera(): UseCameraReturn {
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const openCamera = async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
            streamRef.current = stream;
            setIsCameraOpen(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 1000);
        } catch (err) {
            const error = err as Error;
            alert('Could not access the camera: ' + error.message);
        }
    };

    const capturePhoto = (): string | null => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const imageUrl = canvas.toDataURL('image/png');
                closeCamera();
                return imageUrl;
            }
        }
        return null;
    }

    const closeCamera = (): void => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setIsCameraOpen(false);
        };
    };

    return {
        isCameraOpen,
        videoRef,
        canvasRef,
        openCamera,
        capturePhoto,
        closeCamera
    };
}