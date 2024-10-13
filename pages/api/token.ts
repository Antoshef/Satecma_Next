import { serialize } from 'cookie';
import { generateToken } from '@/utils/cookies'; // Your token generation logic
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const userData = req.body; // Assuming this contains user data

      // Generate JWT token
      const token = generateToken(userData);
      console.log('token', token);

      // Set the cookie
      res.setHeader(
        'Set-Cookie',
        serialize('authToken', token, {
          httpOnly: true, // Secure, only accessible via HTTP, not JavaScript
          secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
          sameSite: 'strict', // Prevents CSRF
          path: '/', // Cookie is valid across the entire site
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      );

      // Optionally return the token in the response body
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
