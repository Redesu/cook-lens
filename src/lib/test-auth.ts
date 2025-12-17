import { encode } from "next-auth/jwt";

export async function createTestSession(userId: string) {
  const token = {
    id: userId,
    email: "test@test.com",
    name: "Test User",
    picture: null,
  };

  const secret = process.env.NEXTAUTH_SECRET!;
  const sessionToken = await encode({ token, secret });

  return sessionToken;
}
