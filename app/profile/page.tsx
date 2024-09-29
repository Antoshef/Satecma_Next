import { ProfileDetails } from './profileDetails';
import { Suspense } from 'react';
import Loading from '@/loading';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { baseUrl } from '@/constants';
import AppLayout from '@/clients/layout';

async function ProfilePage() {
  const company = await fetch(`${baseUrl}/api/company`)
    .then((data) => data.json())
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto p-4">
        <ProfileDetails company={company} />
      </div>
    </Suspense>
  );
}

ProfilePage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};

export default withPageAuthRequired(ProfilePage);
