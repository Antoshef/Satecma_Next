import { StoreProductData } from "@/components/store/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const results = await queryAsync<StoreProductData[]>(
        "SELECT * FROM products_storage"
      );
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.json(results);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  } else if (method === "POST") {
    // Validate input before attempting to insert into the database
    const product = req.body as StoreProductData;
    if (!product.name || !product.code || !product.unit || !product.quantity) {
      return res
        .status(400)
        .json({ message: "Missing required product fields" });
    }
    try {
      const query = `INSERT INTO products_storage (name, code, unit, quantity) VALUES (?, ?, ?, ?)`;
      const values = [
        product.name,
        product.code,
        product.unit,
        product.quantity,
      ];
      await queryAsync<StoreProductData>(query, values);
      return res.status(201).json({ message: "Product added" });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
