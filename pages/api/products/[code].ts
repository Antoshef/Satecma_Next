import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Product } from '@/products/utils/types';
import { authMiddleware } from '@/utils/auth';

const fetchProductByCode = async (
  code: string,
  user_id: string
): Promise<Product | null> => {
  const results = await queryAsync<Product[]>(
    'SELECT * FROM products_test WHERE code = ? AND user_id = ?',
    [code, user_id]
  );
  return results.length > 0 ? results[0] : null;
};

const updateProduct = async (
  product: Product,
  code: string,
  user_id: string
) => {
  const productToUpdate = await fetchProductByCode(code, user_id);
  if (!productToUpdate) {
    throw new Error('Продуктът не е намерен');
  }

  const query = `
    UPDATE products_test
    SET 
      name = ?, 
      unit = ?, 
      packing = ?, 
      quantity = ?, 
      color = ?, 
      buyPrice = ?, 
      percentageIncrease = ?, 
      sellPrice = ?, 
      category = ? 
    WHERE code = ? AND user_id = ?`;

  const values = [
    product.name,
    product.unit,
    product.packing,
    product.quantity,
    product.color,
    product.buyPrice,
    product.percentageIncrease,
    product.sellPrice,
    product.category,
    code,
    user_id
  ];

  await queryAsync<Product>(query, values);
};

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise<void>((resolve) => authMiddleware(req, res, resolve));

  // Extract the user's ID from the JWT token
  const user_id = (req as any).user.userId;
  const { code } = req.query;
  const { product } = req.body as { product: Product };

  if (!product.name || !product.code || !code) {
    return res
      .status(400)
      .json({ message: 'Липсват задължителни полета на продукта' });
  }

  try {
    await updateProduct(product, code as string, user_id);
    return res.status(201).json({ message: 'Продуктът е актуализиран' });
  } catch (error) {
    return res.status(500).json({
      message: 'Грешка при актуализиране на продукта',
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
    case 'PUT':
      return await handlePutRequest(req, res);
    default:
      res.setHeader('Allow', ['PUT']);
      return res.status(405).json({ message: `Метод ${method} не е разрешен` });
  }
}
