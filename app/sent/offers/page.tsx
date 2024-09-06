async function OffersPage() {
  const offers = await fetchOffers();
  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <Link to={`/offers/${offer.id}`}>{offer.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OffersPage;
