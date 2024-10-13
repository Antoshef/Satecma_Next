import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token, 'token');

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }
    // Verify the token using your JWT secret
    // console.log('VERIFY');
    // console.log(jwtSecret, 'JWT');
    const decoded = jwt.verify(token, jwtSecret);
    // console.log(decoded, 'decoded');
    (req as any).user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or request handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
