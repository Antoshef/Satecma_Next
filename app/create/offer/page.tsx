import { baseUrl } from '@/constants';
import { OfferBox } from './offerBox';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function OfferPage() {
  const provider = await fetch(`${baseUrl}/api/company`).then((res) =>
    res.json()
  );

  const products = await fetch(`${baseUrl}/api/products`)
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error:', error);
      return [];
    });

  return (
    <div>
      <OfferBox products={products} provider={provider} />
    </div>
  );
});
