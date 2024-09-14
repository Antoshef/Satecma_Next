import VerifyEmailModal from "./verificationPage";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "./api/auth/[auth0]/types";
import { fetchData } from "./utils/fetchData";
import { SEOAccordion } from "./components/seoAccordion";
import { Header } from "./components/homePage/header";
import { ScrollableText } from "./components/homePage/scrollableText";
import { HeroBanner } from "./components/homePage/heroBanner";
import { Intro } from "./components/homePage/intro";
import { StartNow } from "./components/homePage/startNow";

export default async function HomePage() {
  const session = await getSession();

  let user: User | null = null;
  if (session) {
    const { accessToken } = session;

    try {
      const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        user = await response.json();

        if (user?.email_verified) {
          // Check if user already exists
          const userExistsResponse = await fetchData(
            `/api/profile?sub=${user.sub}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!userExistsResponse.data) {
            // User does not exist, proceed with POST request
            await fetchData("/api/profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info or checking existence:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {user && user.email_verified && <VerifyEmailModal user={user} />}

      {/* Header section with full-width image */}
      <Header />

      <div className="p-6 bg-gray-100 min-h-screen">
        <Intro />
        <HeroBanner />
        <ScrollableText />
        <StartNow />

        <div className="my-12 p-8 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-white max-w-6xl mx-auto">
          <h2 className="font-bold text-primary tracking-wide text-center mb-6">
            Защо да изберете нашето приложение?
          </h2>
          <SEOAccordion />
        </div>
      </div>
    </div>
  );
}
