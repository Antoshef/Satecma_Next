import { ProductData } from "@/invoice/invoiceBox/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    try {
      const results = await queryAsync<ProductData[]>(
        "SELECT * FROM product_prices"
      );
      if (!results || results.length === 0) {
        res.status(404).json({ message: "Not found" });
      }
      res.json(results);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
