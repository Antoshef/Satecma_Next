import { NextApiRequest, NextApiResponse } from "next";
import { StoreProductData } from "@/components/store/types";
import { queryAsync } from "../db";

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
      if (!results) {
        res.status(404).json({ message: "Not found" });
      }
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (method === "POST") {
    try {
      const product = req.body as StoreProductData;
      const query = `INSERT INTO products_storage (name, code, unit, quantity) VALUES (?, ?, ?, ?)`;
      const values = [
        product.name,
        product.code,
        product.unit,
        product.quantity,
      ];
      await queryAsync<StoreProductData>(query, values);
      res.json({ message: "Product added" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
