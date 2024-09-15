import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Product } from '@/create/invoice/types';
import { StoreProduct } from '@/store/utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const results = await queryAsync<Product[]>('SELECT * FROM products');
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(results);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: (error as any).message
      });
    }
  } else if (method === 'PUT') {
    const { product } = req.body as { product: StoreProduct };
    if (!product.name || !product.code || !product.unit) {
      return res
        .status(400)
        .json({ message: 'Missing required product fields' });
    }
    try {
      const productToUpdate = await queryAsync<Product[]>(
        `SELECT * FROM products WHERE code = ?`,
        [product.code]
      );
      if (!productToUpdate || productToUpdate.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const packingArr = productToUpdate[0].packing.split(',').map(Number);
      const quantityArr = productToUpdate[0].quantity.split(',').map(Number);
      const index = packingArr.indexOf(product.package);
      if (index !== -1) {
        quantityArr[index] = product.quantity;
      }

      const query = `UPDATE products SET name = ?, unit = ?, quantity = ? WHERE code = ?`;
      const values = [
        product.name,
        product.unit,
        quantityArr.join(', '),
        product.code
      ];
      await queryAsync<Product>(query, values);
      return res.status(201).json({ message: 'Product updated' });
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({
        message: 'Error while updating product',
        error: (error as any).message
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
