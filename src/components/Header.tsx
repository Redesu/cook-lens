'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const { data: session, status } = useSession();
    const [disabled, setDisabled] = useState(false);

    const handleAuthenticationButtonClick = () => {
        setDisabled(true);
        signOut({ callbackUrl: "/login" });
    };

    return (
        <header className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    Cook Lens
                </Link>
            </h1>

            <nav className="flex items-center gap-4">
                <Link
                    href="/about"
                    className="text-sm font-bold hover:underline"
                >
                    About
                </Link>

                {status === "loading" ? (
                    <div className="w-8 h-8 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 animate-spin text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </div>
                ) : session ? (
                    <div className="flex items-center gap-3">
                        {session.user?.image && (
                            <img
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <Link href='/profile' onClick={() => setDisabled(true)}>
                            <span className={`text-sm font-medium hover:underline cursor-pointer`}>
                                {session.user?.name || session.user?.email}
                            </span>
                        </Link>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                            onClick={() => handleAuthenticationButtonClick()}
                            disabled={disabled}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleAuthenticationButtonClick()}
                        disabled={disabled}
                    >
                        Sign In
                    </button>
                )}
            </nav>
        </header>
    )
}