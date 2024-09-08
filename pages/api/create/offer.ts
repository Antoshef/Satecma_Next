import { NextApiRequest, NextApiResponse } from "next";
import { generateAndSendDocument } from "./documentUtils";
import { DocumentRequestBody } from "./types";

interface TypedNextApiRequest extends NextApiRequest {
  body: DocumentRequestBody;
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "POST") {
    try {
      const documentRequest = req.body;

      // Validate required fields
      const requiredFields: (keyof DocumentRequestBody)[] = [
        "email",
        "name",
        "html",
        "css",
        "sendMailToRecepient",
        "documentType",
        "providerName",
        "client",
      ];
      const missingFields: (keyof DocumentRequestBody)[] = [];

      requiredFields.forEach((field) => {
        if (!documentRequest[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Generate and send the document
      const { path: filePath } = await generateAndSendDocument(documentRequest);
      if (!filePath) {
        return res.status(500).json({ message: "Error generating document" });
      }

      // Successfully saved the document
      return res.status(200).json({
        message: "Document generated and sent",
        file_path: filePath,
      });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
