import { Product } from '@/create/invoice/types';
import { StoreProduct } from '@/products/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';

const fetchProductByCode = async (code: string): Promise<Product | null> => {
  const results = await queryAsync<Product[]>(
    'SELECT * FROM products WHERE code = ?',
    [code]
  );
  return results.length > 0 ? results[0] : null;
};

const updateProduct = async (product: StoreProduct, code: string) => {
  const productToUpdate = await fetchProductByCode(code);
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
  const values = [product.name, product.unit, quantityArr.join(', '), code];
  await queryAsync<Product>(query, values);
};

const removeProductByCode = async (code: string): Promise<void> => {
  const query = 'DELETE FROM products WHERE code = ?';
  await queryAsync(query, [code]);
};

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = JSON.parse(req.body) as { product: StoreProduct };

  if (!product.name || !product.code || !product.unit) {
    return res.status(400).json({ message: 'Missing required product fields' });
  }

  try {
    await updateProduct(product, product.code);
    return res.status(201).json({ message: 'Product updated' });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Error while updating product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: 'Product code is required' });
  }

  try {
    const product = await fetchProductByCode(code);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await removeProductByCode(code);
    return res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Error while deleting product',
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
    case 'DELETE':
      return await handleDeleteRequest(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
