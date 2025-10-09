import Link from "next/link";

export default function Header() {


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
                <button className="text-sm bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700">
                    <Link href="/login">
                        Sign In
                    </Link>
                </button>
            </div>
        </header>
    )
}