import { signIn } from "next-auth/react";

export default function handleSignIn(provider: string) {
    return signIn(provider, { callbackUrl: "/" });
}