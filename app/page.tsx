import { getSession } from "@auth0/nextjs-auth0";
import AuthModal from "./components/authModal/authModal";

export default async function HomePage() {
  const session = await getSession();
  const user = session?.user || null;
  const isModalOpen = !user;

  return <div>{isModalOpen && <AuthModal open={isModalOpen} />}</div>;
}
