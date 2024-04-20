import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../db";
import { ProductData } from "@/components/invoice/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const results = await queryAsync<ProductData[]>(
        "SELECT * FROM product_prices"
      );
      if (!results) {
        res.status(404).json({ message: "Not found" });
      }
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
