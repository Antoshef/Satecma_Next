import { createRouter } from 'next-connect';
import multer, { Multer } from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

const logoDir: string = path.join(process.cwd(), 'public', 'images', 'logo');

// Helper function to delete all files in a folder
async function deleteAllFilesInFolder(folderPath: string): Promise<void> {
  try {
    const files: string[] = await fs.readdir(folderPath);
    await Promise.all(
      files.map((file: string) => fs.unlink(path.join(folderPath, file)))
    );
    console.log(`All files in ${folderPath} deleted.`);
  } catch (error) {
    console.error(`Error deleting files in ${folderPath}:`, error);
  }
}

// Middleware to delete all existing files before saving the new one
async function deleteOldFilesMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
): Promise<void> {
  try {
    await deleteAllFilesInFolder(logoDir);
    next(); // Proceed to the next middleware (multer for file upload)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete old files' });
  }
}

// Configure multer to save files in the public/assets/logo directory
const upload: Multer = multer({
  storage: multer.diskStorage({
    destination: logoDir,
    filename: (
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const ext: string = path.extname(file.originalname);
      const newFilename = `logo${ext}`;
      cb(null, newFilename);
    }
  })
});

// Create the router using createRouter function
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
  deleteOldFilesMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: any, res: any, next: any) => upload.single('file')(req, res, next),
  async (req: NextApiRequest, res: NextApiResponse) => {
    const reqWithFile = req as NextApiRequestWithFile;
    if (reqWithFile.file) {
      const fileUrl = `/assets/logo/${reqWithFile.file.filename}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  }
);

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const files: string[] = await fs.readdir(logoDir);

    // Find the logo file regardless of the extension
    const logoFile: string | undefined = files.find((file: string) =>
      file.startsWith('logo')
    );

    if (!logoFile) {
      return res.status(200).json({ message: 'No logo found' });
    }

    // Return the URL to the logo file
    const logoUrl = `/images/logo/${logoFile}`;
    res.status(200).json({ url: logoUrl });
  } catch (error) {
    console.error('Error retrieving logo:', error);
    res.status(500).json({ error: 'Failed to retrieve logo' });
  }
});

// Export the router as default
export default router.handler({
  onError(err: unknown, req: NextApiRequest, res: NextApiResponse) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).end(`Error: ${errorMessage}`);
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).end(`Method ${req.method} not allowed`);
  }
});

// Export configuration to disable body parsing (needed for multer)
export const config = {
  api: {
    bodyParser: false
  }
};
