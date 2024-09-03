import { getSession } from "@auth0/nextjs-auth0";

interface Session {
  user: {
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
  };
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: number;
  idToken: string;
  token_type: string;
}

export default async function ProfilePage() {
  const response = (await getSession()) as Session;
  const { user } = response;

  return (
    user && (
      <div>
        <img src={user.picture || undefined} alt={user.name || undefined} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
