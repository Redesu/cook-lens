'use client';

import { useToast } from "@/contexts/ToastContext";
import copyToClipboard from "@/utils/copyUrlToClipboard";
import { Share } from "lucide-react";

export default function ShareButton() {
    const { showToast } = useToast();
    const handleShare = async () => {
        const success = await copyToClipboard();
        if (success) {
            showToast('Copied to clipboard', 'success');
        } else {
            showToast('Failed to copy to clipboard', 'error');
        }
    }

    return (
        <button
            onClick={handleShare}
            className="w-fit transform transition-transform hover:scale-125 duration-200"
        >
            <Share />
        </button>
    )
}