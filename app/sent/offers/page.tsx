import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function OffersPage() {
  const offers = await fetchOffers();
  return (
    <div>
      <h1>Оферти</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <Link to={`/offers/${offer.id}`}>{offer.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
