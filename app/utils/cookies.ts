import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { ServerResponse } from 'http';

const jwtSecret = process.env.JWT_SECRET;

export function generateToken(userId: string) {
  const payload = { userId };
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

export function setTokenCookie(res: ServerResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use HTTPS only in production
      sameSite: 'strict', // Prevents CSRF attacks
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  );
}
