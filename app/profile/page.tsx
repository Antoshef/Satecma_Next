import { ProfileDetails } from './profileDetails';
import { Suspense } from 'react';
import Loading from '@/loading';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppLayout from '@/clients/layout';
import LogoProvider from '@/context/logoContext';

async function ProfilePage() {
  const session = await getSession();
  const data = await fetch(`/api/companies?user_id=${session?.user.sub}`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return null;
    });

  const user = await fetch(`/api/users?user_id=${session?.user.sub}`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <LogoProvider>
      <Suspense fallback={<Loading />}>
        <div className="container mx-auto p-4">
          <ProfileDetails company={data} />
        </div>
      </Suspense>
    </LogoProvider>
  );
}

ProfilePage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};

export default withPageAuthRequired(ProfilePage);
