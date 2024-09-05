import { getSession as originalGetSession } from "@auth0/nextjs-auth0";

export interface User {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}

export interface Session {
  user: User;
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: number;
  idToken: string;
  token_type: string;
}

export async function getSession(): Promise<Session> {
  const session = await originalGetSession();
  return session as Session;
}
