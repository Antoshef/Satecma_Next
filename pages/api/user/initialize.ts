import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db'; // Import your database connection utility
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);

  // if (!session || !session.user) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // const userId = session.user.sub; // Get user ID from Auth0 session

  try {
    // Create necessary tables for the user (replace with your actual table creation logic)
    // await queryAsync(`
    //   CREATE TABLE IF NOT EXISTS user_profiles (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     user_id VARCHAR(255) UNIQUE NOT NULL,
    //     name VARCHAR(255),
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);

    // await queryAsync(
    //   `
    //   INSERT INTO user_profiles (user_id, name)
    //   VALUES (?, ?)
    //   ON DUPLICATE KEY UPDATE user_id = user_id;
    // `,
    //   [userId, session.user.name || '']
    // );
    console.log('User initialized:');

    // Add any additional initialization logic here

    return res.status(201).json({ message: 'User initialized successfully' });
  } catch (error) {
    console.error('Initialization error:', error);
    return res
      .status(500)
      .json({ message: 'Error initializing user', error: (error as Error).message });
  }
}
