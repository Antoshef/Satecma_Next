import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function OffersPage() {
  return (
    <div>
      <h1>Оферти</h1>
    </div>
  );
});
