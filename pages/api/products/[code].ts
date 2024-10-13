import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';
import { Product } from '@/products/utils/types';

const fetchProductByCode = async (
  product_uuid: string,
  user_id: string
): Promise<Product | null> => {
  const results = await queryAsync<Product[]>(
    'SELECT * FROM products_test WHERE product_uuid = ? AND user_id = ?',
    [product_uuid, user_id]
  );
  return results.length > 0 ? results[0] : null;
};

const updateProduct = async (
  product: Product,
  product_uuid: string,
  user_id: string
) => {
  const productToUpdate = await fetchProductByCode(product_uuid, user_id);
  if (!productToUpdate) {
    throw new Error('Продуктът не е намерен');
  }

  const query = `
    UPDATE products_test
    SET 
      code = ?,
      name = ?, 
      unit = ?, 
      packing = ?, 
      quantity = ?, 
      color = ?, 
      buyPrice = ?, 
      percentageIncrease = ?, 
      sellPrice = ?, 
      category = ? 
    WHERE product_uuid = ? AND user_id = ?`;

  const values = [
    product.code,
    product.name,
    product.unit,
    product.packing,
    product.quantity,
    product.color,
    product.buyPrice,
    product.percentageIncrease,
    product.sellPrice,
    product.category,
    product_uuid,
    user_id
  ];

  await queryAsync<Product>(query, values);
};

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code: product_uuid, user_id } = req.query;
  const product = req.body as Product;

  if (!product_uuid || !user_id) {
    return res
      .status(400)
      .json({ message: 'Липсват задължителни полета на продукта' });
  }

  try {
    await updateProduct(product, product_uuid as string, user_id as string);
    return res
      .status(201)
      .json({ message: 'Продуктът е актуализиран', product });
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
