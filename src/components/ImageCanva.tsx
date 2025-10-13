import { X } from "lucide-react";

interface ImageCanvasProps {
    capturedImage: string | null,
    uploadedImage: string | null,
    onRemoveCaptured: () => void,
    onRemoveUploaded: () => void
}

export default function ImageCanva({
    capturedImage,
    uploadedImage,
    onRemoveCaptured,
    onRemoveUploaded
}: ImageCanvasProps) {

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {capturedImage && (
                <div className="bg-white rounded-lg shadow-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold text-gray-800">Captured Photo</h2>
                        <button
                            onClick={onRemoveCaptured}
                            className="text-red-600 hover:text-red-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full rounded-lg"
                    />
                </div>
            )}

            {uploadedImage && (
                <div className="bg-white rounded-lg shadow-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold text-gray-800">Uploaded Photo</h2>
                        <button
                            onClick={onRemoveUploaded}
                            className="text-red-600 hover:text-red-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full rounded-lg"
                    />
                </div>
            )}
        </div>
    )
}