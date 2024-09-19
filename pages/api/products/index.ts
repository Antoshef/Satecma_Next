import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Item, Product } from '@/create/invoice/types';

const getProducts = async (res: NextApiResponse) => {
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
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const updateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { items } = req.body as { items: Item[] };

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items provided', status: 400 });
  }

  const filteredItems = items.filter(
    (item) => item.quantity > 0 && item.code !== '0'
  );

  try {
    const products = await queryAsync<Product[]>('SELECT * FROM products');

    for (const item of filteredItems) {
      if (!item.quantity || !item.code || !item.currentPackage) {
        return res
          .status(400)
          .json({ message: 'Missing required fields', status: 400 });
      }

      const productToUpdate = products.find(
        (product) => product.code === item.code
      );

      if (!productToUpdate) {
        console.error('Product not found', item.code);
        continue;
      }

      const packingArr = productToUpdate.packing.split(',').map(Number);
      const quantityArr = productToUpdate.quantity.split(',').map(Number);
      const index = packingArr.indexOf(item.currentPackage);

      if (index !== -1 && quantityArr && index >= 0) {
        quantityArr[index] = quantityArr[index] - item.quantity;

        const query = 'UPDATE products SET quantity = ? WHERE code = ?';
        await queryAsync(query, [quantityArr.join(', '), item.code]);
      }
    }

    return res
      .status(200)
      .json({ message: 'Store items updated', status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Error while updating store items',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const deleteProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { products } = req.body as { products: string[] };

  if (!products || products.length === 0) {
    return res
      .status(400)
      .json({ message: 'No products provided', status: 400 });
  }

  try {
    const placeholders = products.map(() => '?').join(',');
    const query = `DELETE FROM products WHERE code IN (${placeholders})`;
    await queryAsync(query, products);

    return res.status(200).json({ message: 'Products deleted', status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Error while deleting products',
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
    case 'GET':
      return await getProducts(res);
    case 'PUT':
      return await updateProducts(req, res);
    case 'DELETE':
      return await deleteProducts(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
