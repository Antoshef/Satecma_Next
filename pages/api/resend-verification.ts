import { NextApiRequest, NextApiResponse } from 'next';
import { Claims, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { user }: { user: Claims } = req.body;

    if (!user.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const response = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID!,
            client_secret: process.env.AUTH0_CLIENT_SECRET!,
            audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
            scope: 'update:users'
          })
        }
      );

      const token = await response.json();

      if (!response.ok) {
        throw new Error(token.error || 'Failed to fetch access token');
      }

      if (!token) {
        return res.status(401).json({
          message: 'Could not retrieve an access token. Please sign in again.'
        });
      }

      // Prepare headers and body for the verification email request
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token.access_token}`);

      const raw = JSON.stringify({
        user_id: user.sub
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect
      };

      // Send the verification email
      const verificationResponse = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/jobs/verification-email`,
        requestOptions
      );

      const result = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(result.error || 'Failed to send verification email');
      }

      return res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      // Log the error details
      console.error('Error Details:', error);
      return res
        .status(500)
        .json({ message: 'Error sending verification email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
