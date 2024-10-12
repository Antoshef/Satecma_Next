import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Product } from '@/products/utils/types';

// Fetch products for a specific user and company
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, company_eik } = req.query;

  if (!user_id || !company_eik) {
    return res
      .status(400)
      .json({ message: 'User ID and Company EIK are required', status: 400 });
  }

  try {
    const query =
      'SELECT * FROM products WHERE user_id = ? AND company_eik = ?';
    const results = await queryAsync<Product[]>(query, [user_id, company_eik]);

    return res.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update products for a specific user and company
const updateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    items,
    user_id,
    company_eik
  }: { items: Product[]; user_id: string; company_eik: string } = req.body;

  if (!items || items.length === 0 || !user_id || !company_eik) {
    return res.status(400).json({
      message: 'Items, User ID, and Company EIK are required',
      status: 400
    });
  }

  const filteredItems = items.filter((item) => item.quantity > 0);

  try {
    const products = await queryAsync<Product[]>(
      'SELECT * FROM products WHERE user_id = ? AND company_eik = ?',
      [user_id, company_eik]
    );

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

      const query =
        'UPDATE products SET quantity = ? WHERE code = ? AND user_id = ? AND company_eik = ?';
      await queryAsync(query, [item.quantity, item.code, user_id, company_eik]);
    }

    return res
      .status(200)
      .json({ message: 'Products updated successfully', status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Error updating products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete products for a specific user and company
const deleteProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { products } = req.body as { products: Product[] };

  if (!products || products.length === 0) {
    return res
      .status(400)
      .json({ message: 'No products provided', status: 400 });
  }

  try {
    const codes = products.map((product) => product.code);
    const placeholders = codes.map(() => '?').join(',');
    const query = `DELETE FROM products WHERE code IN (${placeholders}) AND user_id = ? AND company_eik = ?`;
    await queryAsync(query, [...codes, req.body.user_id, req.body.company_eik]);

    return res
      .status(200)
      .json({ message: 'Products deleted successfully', status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Error deleting products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create a new product
const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { product } = req.body as { product: Product };

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
    const { user_id, company_eik } = req.body;

    if (!user_id || !company_eik) {
      return res
        .status(400)
        .json({ message: 'User ID and Company EIK are required', status: 400 });
    }

    // Check if a product with the same code already exists
    const checkQuery =
      'SELECT COUNT(*) as count FROM products WHERE code = ? AND user_id = ? AND company_eik = ?';
    const checkValues = [product.code, user_id, company_eik];
    const result = await queryAsync<{ count: number }[]>(
      checkQuery,
      checkValues
    );
    const count = result[0].count;

    if (count > 0) {
      return res.status(400).json({
        message: 'Product with this code already exists',
        status: 400
      });
    }

    // Insert the new product with user_id and company_eik
    const query = `
      INSERT INTO products (product_uuid, user_id, company_eik, code, name, packing, unit, color, category, buyPrice, sellPrice, percentageIncrease, quantity)
      VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      user_id,
      company_eik,
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

    return res
      .status(201)
      .json({ message: 'Product created successfully', status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return res.status(500).json({
      message: 'Error creating product',
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
      return await getProducts(req, res);
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
