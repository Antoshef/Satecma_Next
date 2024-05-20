import { Item, Product } from "@/create/invoice/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  if (method === "PUT") {
    const { items } = req.body as { items: Item[] };

    try {
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ message: "No items provided", status: 400 });
      }
      const filteredItems = items.filter(
        (item) => item.quantity > 0 && item.code !== "0",
      );
      const products = await queryAsync<Product[]>(`SELECT * FROM products`);
      for (const item of filteredItems) {
        if (!item.quantity || !item.code || !item.currentPackage) {
          return res
            .status(400)
            .json({ message: "Missing required fields", status: 400 });
        }
        const productToUpdate = products.find(
          (product) => product.code === item.code,
        );
        if (!productToUpdate) {
          console.error("Product not found", productToUpdate);
        }
        const packingArr = productToUpdate?.packing.split(",").map(Number);
        const quantityArr = productToUpdate?.quantity.split(",").map(Number);
        const index = packingArr?.indexOf(item.currentPackage);
        if (index !== -1 && quantityArr && index) {
          quantityArr[index] = quantityArr[index] - item.quantity;
        }

        const query = `UPDATE products SET quantity = ? WHERE code = ?`;
        await queryAsync(query, [quantityArr, item.code]);
      }
      return res
        .status(200)
        .json({ message: "Store items updated", status: 200 });
    } catch (error) {
      console.error("PUT error:", error);
      return res.status(500).json({
        message: "Error while updating store items",
        error: (error as any).message,
      });
    }
  }
}
