'use client';

import copyToClipboard from "@/utils/copyUrlToClipboard";
import { Share } from "lucide-react";

export default function ShareButton() {
    return (
        <button
            onClick={() => copyToClipboard()}
            className="w-fit transform transition-transform hover:scale-125 duration-200"
        >
            <Share />
        </button>
    )
}