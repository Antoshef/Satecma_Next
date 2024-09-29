import { createRouter } from 'next-connect'; // Use createRouter from next-connect
import multer from 'multer';
import { promises as fs } from 'fs'; // Use fs to interact with the file system
import path from 'path'; // Import path module
import { NextApiRequest, NextApiResponse } from 'next';

// Configure multer to save files in the public/assets/logo directory
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/assets/logo',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Extract the file extension
      const newFilename = `logo${ext}`; // Save the file with a fixed name 'logo' and the original extension
      cb(null, newFilename); // Save the file with the new name
    }
  })
});

// Create the router using createRouter function
const router = createRouter();

// Middleware for handling file upload
router.use((req, res, next) => {
  upload.single('file')(req as any, res as any, next as any);
});

// POST handler for saving the uploaded logo
router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.file) {
    const fileUrl = `/assets/logo/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// GET handler for retrieving the saved logo
router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const logoDir = path.join(process.cwd(), 'public', 'assets', 'logo');
    const files = await fs.readdir(logoDir);

    // Find the logo file regardless of the extension
    const logoFile = files.find((file) => file.startsWith('logo'));

    if (!logoFile) {
      return res.status(404).json({ error: 'Logo not found' });
    }

    // Return the URL to the logo file
    const logoUrl = `/assets/logo/${logoFile}`;
    res.status(200).json({ url: logoUrl });
  } catch (error) {
    console.error('Error retrieving logo:', error);
    res.status(500).json({ error: 'Failed to retrieve logo' });
  }
});

// Export the router as default
export default router.handler({
  onError(err, req, res) {
    (res as NextApiResponse).status(500).end(`Error: ${err.message}`);
  },
  onNoMatch(req, res) {
    (res as NextApiResponse)
      .status(405)
      .end(`Method ${req.method} not allowed`);
  }
});

// Export configuration to disable body parsing (needed for multer)
export const config = {
  api: {
    bodyParser: false
  }
};
