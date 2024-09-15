import { redirect } from 'next/navigation';
import VerifyEmailModal from './verificationPage';
import { getSession } from '@auth0/nextjs-auth0';
import { fetchData } from './utils/fetchData';
import { SEOAccordion } from './components/seoAccordion';
import { Header } from './components/homePage/header';
import { ScrollableText } from './components/homePage/scrollableText';
import { HeroBanner } from './components/homePage/heroBanner';
import { Intro } from './components/homePage/intro';
import { StartNow } from './components/homePage/startNow';

export default async function HomePage() {
  const session = await getSession();

  console.log('SESSION', session);
  if (session) {
    const { accessToken } = session;

    const response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const result = await response.json();
    console.log('RESULT', result);
    if (result.sub) {
      const userExistsResponse = await fetchData(
        `/api/profile?sub=${session.user?.sub}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (
        userExistsResponse.data &&
        Object.keys(userExistsResponse.data).length === 0
      ) {
        // User does not exist, proceed with POST request
        await fetchData('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(session.user)
        });
      }

      redirect('/store');
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {session && session.user && <VerifyEmailModal user={session.user} />}
      {/* Header section with full-width image */}
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <Intro />
        <HeroBanner />
        <ScrollableText />
        <StartNow />

        <div className="my-12 p-8 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-white max-w-7xl mx-auto">
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
}
