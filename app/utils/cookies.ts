import { Profile } from '@/profile/types';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export function generateToken(user: Profile) {
  const payload = { userId: user.sub };
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '7d'
  });

  return token;
}

export function verifyToken(token: string) {
  try {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
}
