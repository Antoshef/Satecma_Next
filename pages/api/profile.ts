import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../utils/db';
import { Claims } from '@auth0/nextjs-auth0';

interface TypedNextApiRequest extends NextApiRequest {
  body: Claims;
}

const tableName = 'profile';

async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      sub VARCHAR(255) PRIMARY KEY,
      given_name VARCHAR(255),
      family_name VARCHAR(255),
      nickname VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      picture VARCHAR(255),
      updated_at VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      email_verified BOOLEAN NOT NULL
    );
  `;
  await queryAsync(createTableQuery);
}

function isValidUser(user: Claims): boolean {
  return (
    !!user.sub &&
    !!user.nickname &&
    !!user.name &&
    !!user.picture &&
    !!user.updated_at &&
    !!user.email
  );
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await createTableIfNotExists();

  if (method === 'POST') {
    try {
      const userData: Claims = req.body;

      console.log('userData', userData);
      if (!isValidUser(userData)) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      // Check if user already exists
      const checkUserQuery = `SELECT * FROM ${tableName} WHERE sub = ?`;
      const existingUser = await queryAsync<Claims[]>(checkUserQuery, [
        userData.sub
      ]);

      if (existingUser.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const insertQuery = `
        INSERT INTO ${tableName} (sub, given_name, family_name, nickname, name, picture, updated_at, email, email_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *;
      `;
      const values = [
        userData.sub,
        userData.given_name,
        userData.family_name,
        userData.nickname,
        userData.name,
        userData.picture,
        userData.updated_at,
        userData.email,
        userData.email_verified
      ];

      const result = await queryAsync<Claims>(insertQuery, values);
      return res.status(201).json({ data: result });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (method === 'GET') {
    try {
      const { sub } = req.query;
      if (!sub) {
        return res.status(400).json({ message: 'Missing sub parameter' });
      }

      const getUserQuery = `SELECT * FROM ${tableName} WHERE sub = ?`;
      const user = await queryAsync<Claims[]>(getUserQuery, [sub]);

      if (user.length === 0) {
        return res.status(200).json({ data: {} });
      }

      return res.status(200).json({ data: user[0] });
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
