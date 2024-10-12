import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './cookies';

export function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token and attach the user data to the request object
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Attach the decoded user info to the request
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
