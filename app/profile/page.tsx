import { fetchData } from '@/utils/fetchData';
import { Company } from '@/create/invoice/types';
import { ProfileDetails } from './profileDetails';
import { Suspense } from 'react';
import Loading from '@/loading';
import CompanySearch from './companySearch';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function ProfilePage() {
  const companies = await fetchData<Company>(
    'http://localhost:3000/api/company'
  )
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto p-4">
        <CompanySearch />
        {companies && <ProfileDetails companies={companies} />}
      </div>
    </Suspense>
  );
});
