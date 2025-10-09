'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [loading, setLoading] = useState(false);


    const handleLoginRedirect = () => {
        setLoading(true);
        const loginButton = document.querySelector('.login-button');
        if (loginButton) {
            loginButton.setAttribute('disabled', 'true');
            loginButton.classList.add('opacity-50', 'cursor-none');
        }
        window.location.href = "/login";
    }


    return (
        <header className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold cursor-pointer">
                <Link href="/">
                    Cook Lens
                </Link>
            </h1>
            <div className="space-x-4 flex items-center">
                <button className="text-xm font-bold cursor-pointer py-2 px-4 hover:underline">
                    <Link href="/about">
                        About
                    </Link>
                </button>
                <button className={`text-sm bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold login-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleLoginRedirect} disabled={loading}>
                    <Link href="/login">
                        Sign In
                    </Link>
                </button>
            </div>
        </header>
    )
}