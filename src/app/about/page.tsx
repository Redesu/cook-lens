import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <h2 className="text-4xl font-bold text-center mb-2">
                    About this App
                </h2>
                <p className="text-center mb-8">

                </p>

                <div className="w-full max-w-lg space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">
                            What it Does
                        </h3>
                        <p className="text-lg leading-relaxed">
                            This app helps you save money and reduce your food waste by generating recipes from your ingredients.
                        </p>
                        <br />
                        <p className="text-lg leading-relaxed">
                            Using Gemini&apos;s model, it analyzes a photo of your ingredients—or a list you type in—and instantly generate delicious, easy-to-follow recipes. It&apos;s that simple.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-2">
                            Why I Built This
                        </h3>
                        <p className="text-lg leading-relaxed">
                            I made this project to learn how to use Gemini&apos;s API. I also wanted to create a tool that would help people save money and reduce their food waste.
                        </p>
                    </div>

                    <Link href="/" className="block w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 cursor-pointer text-center">
                        Back to Home
                    </Link>
                </div>

                <a href="https://redesu.com.br/#projetos" className="mt-8 text-blue-600 underline cursor-pointer">
                    My other projects
                </a>
            </main>
        </div>
    )
}