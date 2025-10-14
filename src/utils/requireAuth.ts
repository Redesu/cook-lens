import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return;
    }

    return session.user.id;
}