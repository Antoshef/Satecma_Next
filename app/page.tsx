import { redirect } from 'next/navigation';
import { Claims, getSession } from '@auth0/nextjs-auth0';
import VerifyEmailModal from './verifyEmailModal';
import { Header } from './components/homePage/header';
import { SEOAccordion } from './components/seoAccordion';
import { ScrollableText } from './components/homePage/scrollableText';
import { HeroBanner } from './components/homePage/heroBanner';
import { Intro } from './components/homePage/intro';
import { StartNow } from './components/homePage/startNow';

export default async function HomePage() {
  const session = await getSession();

  if (!session) {
    // If no session, you can render the component without a user or handle accordingly
    return <Component user={null} />;
  }

  const { accessToken } = session;

  // Fetch user data from Auth0 `/userinfo`
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.error('Error fetching user info');
    return <Component user={null} />;
  }

  const result = await response.json();
  console.log(result, 'result');

  if (result.email_verified) {
    // Check if the user exists in your database
    const userExistsResponse = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/profile?email=${result.email}`
    );
    const userExistsData = await userExistsResponse.json();

    if (userExistsResponse.ok && Object.keys(userExistsData).length === 0) {
      // If user doesn't exist, create the user in the database
      await fetch(`${process.env.AUTH0_BASE_URL}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      });
    } else if (userExistsResponse.ok) {
      // If user exists, update the email_verified field
      await fetch(`${process.env.AUTH0_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: result.email, email_verified: true })
      });
    }
    redirect('/store');
  }

  return <Component user={session.user} />;
}

// Main component definition
const Component = ({ user }: { user: Claims | null }) => (
  <div className="bg-gray-100 min-h-screen">
    {user && !user.email_verified && <VerifyEmailModal user={user} />}
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
    <a
      href="https://iconscout.com/illustrations/business"
      className="text-underline font-size-sm"
      target="_blank"
    >
      Illustrations provided
    </a>{' '}
    by{' '}
    <a
      href="https://iconscout.com/contributors/vectory"
      className="text-underline font-size-sm"
      target="_blank"
    >
      Iconscout
    </a>
  </div>
);
