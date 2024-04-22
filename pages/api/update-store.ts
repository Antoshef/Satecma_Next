import { Item } from "@/components/invoice/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "PUT") {
    const { items } = req.body as { items: Item[] };

    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
      }
      const filteredItems = items.filter(
        (item) => item.quantity > 0 && item.code !== 0
      );
      const query = `UPDATE products_storage SET quantity = quantity - ? WHERE code = ?`;
      for (const item of filteredItems) {
        if (!item.quantity || !item.code) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        await queryAsync(query, [item.quantity, item.code]);
      }
      return res.status(200).json({ message: "Store items updated" });
    } catch (error) {
      console.error("PUT error:", error);
      return res.status(500).json({
        message: "Error while updating store items",
        error: (error as any).message,
      });
    }
  }
}
