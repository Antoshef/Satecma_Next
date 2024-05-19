import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";
import { Product } from "@/create/invoice/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const results = await queryAsync<Product[]>("SELECT * FROM products");
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.json({ data: results });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: (error as any).message,
      });
    }
  } else if (method === "PUT") {
    const { product } = req.body as { product: Product };
    if (!product.name || !product.code || !product.unit) {
      return res
        .status(400)
        .json({ message: "Missing required product fields" });
    }
    try {
      const query = `UPDATE products_storage SET name = ?, unit = ?, quantity = ? WHERE code = ? AND packing = ?`;
      const values = [
        product.name,
        product.unit,
        product.quantity,
        product.code,
        product.packing,
      ];
      await queryAsync<Product>(query, values);
      return res.status(201).json({ message: "Product updated" });
    } catch (error) {
      console.error("PUT error:", error);
      return res.status(500).json({
        message: "Error while updating product",
        error: (error as any).message,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
