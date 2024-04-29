import { createRouter } from "next-connect";
import multer from "multer";
import PDFParser from "pdf2json";
import { extractProductData } from "../../utils/extractProductData";

interface FormDataFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: "text/plain";
  buffer: Buffer;
  size: number;
}

// Setup multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Create the router using next-connect
const router = createRouter();

// @ts-expect-error Some types are missing in the multer types
router.use(upload.single("file"));

router.post((req: any, res: any) => {
  const file = req.file as FormDataFile;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const text = file.buffer.toString("utf-8");
  extractProductData(text);
});

export const config = {
  api: {
    bodyParser: false, // Important to disable for file uploads
  },
};

export default router.handler();
