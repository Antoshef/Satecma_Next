import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Product } from '@/products/utils/types';
import { ResponseQuery } from '../types';

// Fetch products for a specific user and company
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      message: 'Липсва потребителски идентификатор на компанията',
      status: 400
    });
  }

  try {
    const query = 'SELECT * FROM products_test WHERE user_id = ?';
    const results = await queryAsync<Product[]>(query, [user_id]);

    return res.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return res.status(500).json({
      message: 'Вътрешна грешка на сървъра',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

// Update products for a specific user and company
const updateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    items,
    user_id
  }: { items: Product[]; user_id: string; company_eik: string } = req.body;

  if (!items || items.length === 0 || !user_id) {
    return res.status(400).json({
      message: 'Липсват артикули, потребителски идентификатор на компанията',
      status: 400
    });
  }

  const filteredItems = items.filter((item) => item.quantity > 0);

  try {
    const products = await queryAsync<Product[]>(
      'SELECT * FROM products_test WHERE user_id = ?',
      [user_id]
    );

    for (const item of filteredItems) {
      if (!item.quantity || !item.product_uuid || !item.packing) {
        return res
          .status(400)
          .json({ message: 'Липсват задължителни полета', status: 400 });
      }

      const productToUpdate = products.find(
        (product) => product.product_uuid === item.product_uuid
      );

      if (!productToUpdate) {
        console.error('Продуктът не е намерен', item.product_uuid);
        continue;
      }

      const query =
        'UPDATE products_test SET quantity = ? WHERE product_uuid = ? AND user_id = ?';
      await queryAsync(query, [item.quantity, item.product_uuid, user_id]);
    }

    return res
      .status(200)
      .json({ message: 'Продуктите са актуализирани успешно', status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Грешка при актуализиране на продуктите',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

// Delete products for a specific user and company
const deleteProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { products, user_id } = req.body as {
    products: Product[];
    user_id: string;
  };

  if (!products || products.length === 0 || !user_id) {
    return res.status(400).json({
      message: 'Липсват продукти, потребителски идентификаторна компанията',
      status: 400
    });
  }

  try {
    const uuids = products.map((product) => product.product_uuid);
    const placeholders = uuids.map(() => '?').join(',');
    const query = `DELETE FROM products_test WHERE code IN (${placeholders}) AND user_id = ? `;
    await queryAsync(query, [...uuids, user_id]);

    return res
      .status(200)
      .json({ message: 'Продуктите са изтрити успешно', status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Грешка при изтриване на продуктите',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

// Create a new product
const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id } = req.query;
  const { product } = req.body as {
    product: Product;
  };

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
        .json({ message: `Липсва задължително поле: ${field}`, status: 400 });
    }
  }

  if (!user_id) {
    return res.status(400).json({
      message: 'Липсва потребителски идентификатор',
      status: 400
    });
  }

  try {
    // Check if a product with the same code already exists
    const checkQuery =
      'SELECT COUNT(*) as count FROM products_test WHERE code = ? AND user_id = ?';
    const checkValues = [product.code, user_id];
    const response = await queryAsync<{ count: number }[]>(
      checkQuery,
      checkValues
    );
    const count = response[0].count;

    if (count > 0) {
      return res.status(400).json({
        message: 'Продукт с този код вече съществува',
        status: 400
      });
    }

    // Insert the new product with user_id and company_eik
    const query = `
      INSERT INTO products_test (user_id, code, name, packing, unit, color, category, buyPrice, sellPrice, percentageIncrease, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      user_id,
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

    const result = await queryAsync<ResponseQuery>(query, values);

    const [newClient] = await queryAsync<Product[]>(
      `SELECT * FROM products_test WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      message: 'Продуктът е създаден успешно',
      status: 201,
      product: newClient
    });
  } catch (error) {
    console.error('POST error:', error);
    return res.status(500).json({
      message: 'Грешка при създаване на продукта',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
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
      return res.status(405).json({ message: 'Методът не е разрешен' });
  }
}
