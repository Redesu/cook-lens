import { X } from "lucide-react";
import { RefObject } from "react";

interface OpenCameraModalProps {
    isOpen: boolean,
    videoRef: RefObject<HTMLVideoElement | null>,
    canvasRef: RefObject<HTMLCanvasElement | null>,
    onClose: () => void;
    onCapture: () => void;
}

export default function OpenCameraModal({
    isOpen,
    videoRef,
    canvasRef,
    onClose,
    onCapture
}: OpenCameraModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                <div className="relative max-w-3xl w-full">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10"
                    >
                        <X size={24} />
                    </button>

                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg"
                    />

                    <button
                        onClick={onCapture}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer"
                    >
                        Capture Photo
                    </button>
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </>
    )
}