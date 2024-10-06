// utils/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Setup JWKS client for Auth0
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const token = req.headers.authorization?.split(' ')[1]; // Get Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    // Attach the decoded user information (including the `sub` field) to the request
    (req as any).user = decoded;
    next();
  });
}
