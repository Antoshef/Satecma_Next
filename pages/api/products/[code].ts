import { Product } from '@/create/invoice/types';
import { StoreProduct } from '@/products/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';

const getProductByCode = async (code: string): Promise<Product | null> => {
  const results = await queryAsync<Product[]>(
    'SELECT * FROM products WHERE code = ?',
    [code]
  );
  return results.length > 0 ? results[0] : null;
};

const updateProduct = async (product: StoreProduct, code: string) => {
  const productToUpdate = await getProductByCode(code);
  if (!productToUpdate) {
    throw new Error('Product not found');
  }

  const packingArr = productToUpdate.packing.split(',').map(Number);
  const quantityArr = productToUpdate.quantity.split(',').map(Number);
  const index = packingArr.indexOf(product.package);

  if (index !== -1) {
    quantityArr[index] = product.quantity;
  }

  const query =
    'UPDATE products SET name = ?, unit = ?, quantity = ? WHERE code = ?';
  const values = [
    product.name,
    product.unit,
    quantityArr.join(', '),
    product.code
  ];
  await queryAsync<Product>(query, values);
};

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = req.body as { product: StoreProduct };

  if (!product.name || !product.code || !product.unit) {
    return res.status(400).json({ message: 'Missing required product fields' });
  }

  try {
    await updateProduct(product, req.query.code as string);
    return res.status(201).json({ message: 'Product updated' });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Error while updating product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      return await handlePutRequest(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
