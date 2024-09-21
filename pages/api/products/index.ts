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
      message: 'Вътрешна грешка на сървъра',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

const updateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { items } = req.body as { items: Item[] };

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Няма предоставени артикули', status: 400 });
  }

  const filteredItems = items.filter((item) => item.quantity > 0);

  try {
    const products = await queryAsync<Product[]>('SELECT * FROM products_test');

    for (const item of filteredItems) {
      if (!item.quantity || !item.code || !item.packing) {
        return res
          .status(400)
          .json({ message: 'Липсват задължителни полета', status: 400 });
      }

      const productToUpdate = products.find(
        (product) => product.code === item.code
      );

      if (!productToUpdate) {
        console.error('Продуктът не е намерен', item.code);
        continue;
      }

      const query = 'UPDATE products SET quantity = ? WHERE code = ?';
      await queryAsync(query, [item.quantity, item.code]);
    }

    return res
      .status(200)
      .json({ message: 'Артикулите в магазина са актуализирани', status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).json({
      message: 'Грешка при актуализиране на артикулите в магазина',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

const deleteProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { products } = req.body as { products: Product[] };

  if (!products || products.length === 0) {
    return res
      .status(400)
      .json({ message: 'Няма предоставени продукти', status: 400 });
  }

  try {
    const codes = products.map((product) => product.code);
    const placeholders = codes.map(() => '?').join(',');
    const query = `DELETE FROM products_test WHERE code IN (${placeholders})`;
    await queryAsync(query, codes);

    return res
      .status(200)
      .json({ message: 'Продуктите са изтрити', status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return res.status(500).json({
      message: 'Грешка при изтриване на продуктите',
      error: error instanceof Error ? error.message : 'Неизвестна грешка'
    });
  }
};

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
        .json({ message: `Липсва задължително поле: ${field}`, status: 400 });
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
        message: 'Продукт с този код вече съществува',
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

    return res
      .status(201)
      .json({ message: 'Продуктът е създаден', status: 201 });
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
      return await getProducts(res);
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
