import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Item } from '@/create/invoice/types';
import { Product } from '@/products/utils/types';

const getProducts = async (res: NextApiResponse) => {
  try {
    const results = await queryAsync<Product[]>('SELECT * FROM products_test');

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
  const { items } = JSON.parse(req.body) as { items: Item[] };

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items provided', status: 400 });
  }

  const filteredItems = items.filter((item) => item.quantity > 0);

  try {
    const products = await queryAsync<Product[]>('SELECT * FROM products_test');

    for (const item of filteredItems) {
      if (!item.quantity || !item.code || !item.packing) {
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

      const query = 'UPDATE products SET quantity = ? WHERE code = ?';
      await queryAsync(query, [item.quantity, item.code]);
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
  const { products } = JSON.parse(req.body) as { products: Product[] };

  if (!products || products.length === 0) {
    return res
      .status(400)
      .json({ message: 'No products provided', status: 400 });
  }

  try {
    const codes = products.map((product) => product.code);
    const placeholders = codes.map(() => '?').join(',');
    const query = `DELETE FROM products_test WHERE code IN (${placeholders})`;
    await queryAsync(query, codes);

    return res.status(200).json({ message: 'Products deleted', status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Error while deleting products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = JSON.parse(req.body) as { product: Product };

  const requiredFields: (keyof Product)[] = [
    'code',
    'name',
    'packing',
    'category',
    'unit',
    'color',
    'buyPrice',
    'sellPrice',
    'percentageIncrease',
    'quantity'
  ];

  for (const field of requiredFields) {
    if (!product[field]) {
      return res
        .status(400)
        .json({ message: `Missing required field: ${field}`, status: 400 });
    }
  }

  try {
    // Check if a product with the same code already exists
    const checkQuery =
      'SELECT COUNT(*) as count FROM products_test WHERE code = ?';
    const checkValues = [product.code];
    const result = await queryAsync<{ count: number }[]>(
      checkQuery,
      checkValues
    );
    const count = result[0].count;

    if (count > 0) {
      return res.status(400).json({
        message: 'Product with the same code already exists',
        status: 400
      });
    }

    const query = `
      INSERT INTO products_test (code, name, packing, unit, color, category, buyPrice, sellPrice, percentageIncrease, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      product.code,
      product.name,
      product.packing,
      product.unit,
      product.color,
      product.category,
      product.buyPrice,
      product.sellPrice,
      product.percentageIncrease,
      product.quantity
    ];

    await queryAsync(query, values);

    return res.status(201).json({ message: 'Product created', status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return res.status(500).json({
      message: 'Error while creating product',
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
    case 'POST':
      return await createProduct(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
