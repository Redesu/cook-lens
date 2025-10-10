import GithubLoginButtion from "@/components/GithubLoginButton";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function Login() {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <GoogleLoginButton />
                <GithubLoginButtion />
            </div>
        </div >

    )
}