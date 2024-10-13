import { getSession } from '@auth0/nextjs-auth0';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export default async function authCallback(req, res) {
  try {
    // Authenticate the user
    const session = await getSession(req, res);
    if (!session) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Generate a JWT token with user info (sub and email for example)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set in the environment variables');
    }
    const payload = {
      userId: session.user.sub,
      email: session.user.email
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

    // Set the JWT token in an HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
    );

    res.redirect('/clients');
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
