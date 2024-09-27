import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../utils/db';
import { Product } from '@/products/utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'GET') {
    try {
      const results = await queryAsync<Product[]>(
        'SELECT * FROM product_prices'
      );
      if (!results || results.length === 0) {
        res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ data: results, status: 200 });
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
