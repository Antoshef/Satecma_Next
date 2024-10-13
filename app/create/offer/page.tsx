import { OfferBox } from './offerBox';
import { mockProducts, mockProvider } from '../invoice/constants';
import LogoProvider from '@/context/logoContext';

export default async function OfferPage() {
  const products = mockProducts;
  const provider = mockProvider;

  // Uncomment and use the following code if you want to fetch data from the API instead of using mocks
  // try {
  //   const productsResponse = await fetch(`${baseUrl}/api/products`);
  //   if (!productsResponse.ok) {
  //     throw new Error(`Failed to load products: ${productsResponse.statusText}`);
  //   }
  //   products = await productsResponse.json();
  // } catch (error) {
  //   console.error('Error loading products:', error);
  // }

  // try {
  //   const providerResponse = await fetch(`${baseUrl}/api/company`);
  //   if (!providerResponse.ok) {
  //     throw new Error(`Failed to load provider: ${providerResponse.statusText}`);
  //   }
  //   provider = await providerResponse.json();
  // } catch (error) {
  //   console.error('Error loading provider:', error);
  // }

  return (
    <LogoProvider>
      <OfferBox products={products} provider={provider} />
    </LogoProvider>
  );
}
