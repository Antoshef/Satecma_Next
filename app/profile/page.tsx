import { ProfileDetails } from './profileDetails';
import { Suspense } from 'react';
import Loading from '@/loading';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppLayout from '@/clients/layout';
import LogoProvider from '@/context/logoContext';

async function ProfilePage() {
  const data = await fetch('/api/company')
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return null;
    });

  const user = await fetch('/api/user')
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return null;
    });
  console.log(user);

  return (
    <LogoProvider>
      <Suspense fallback={<Loading />}>
        <div className="container mx-auto p-4">
          <ProfileDetails
            company={data?.companies ? data?.companies[0] : undefined}
          />
        </div>
      </Suspense>
    </LogoProvider>
  );
}

ProfilePage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};

export default withPageAuthRequired(ProfilePage);
