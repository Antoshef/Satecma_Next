import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const auth0 = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN!,
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        scope: "update:users",
      });

      // Trigger email verification
      await auth0.sendEmailVerification({ email });

      return res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error sending verification email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
