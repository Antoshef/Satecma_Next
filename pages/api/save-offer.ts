import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { OfferMetaData } from '@/create/offer/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const offerData = req.body as OfferMetaData;

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const dirPath = path.join(
      process.cwd(),
      'public',
      'sent',
      'offers',
      year,
      month
    );
    const filePath = path.join(dirPath, offerData.offerNumber + '.json');

    // Ensure the directory exists
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch {
      return res.status(500).json({ error: 'Failed to create directories' });
    }

    let offers = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        offers = JSON.parse(fileData);
      }
    } catch {
      return res.status(500).json({ error: 'Failed to read offers file' });
    }

    offers.push(offerData);

    try {
      fs.writeFileSync(filePath, JSON.stringify(offers, null, 2));
      return res.status(200).json({ message: 'Offer saved successfully' });
    } catch {
      return res.status(500).json({ error: 'Failed to save offer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
