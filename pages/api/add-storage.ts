import { ProductData } from "@/create/invoice/types";
import { InvoiceProductData, StoreProductData } from "@/store/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

const COURSE_EVRO_LEVA = 2;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "PUT") {
    const { items } = req.body as { items: InvoiceProductData[] };

    try {
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ message: "No items provided", status: 400 });
      }
      const filteredItems = items.filter(
        (item) => item.quantity > 0 && item.code !== "0"
      );
      const priceQuery = `SELECT * FROM product_prices`;
      const productPrices = await queryAsync<ProductData[]>(priceQuery);
      const storageQuery = `SELECT * FROM products_storage`;
      const productStorage = await queryAsync<StoreProductData[]>(storageQuery);
      const storageMap = productStorage.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {} as Record<string, StoreProductData>);
      const priceMap = productPrices.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {} as Record<string, ProductData>);

      for (const item of filteredItems) {
        /* Update Product Prices */
        if (!item.code || !item.package || !item.unit || !item.description) {
          return res
            .status(400)
            .json({ message: "Missing required fields", status: 400 });
        }
        const priceItem = priceMap[item.code];
        if (priceItem) {
          const packageIncluded = priceItem.packing.includes(
            item.package.toString()
          );
          if (packageIncluded) {
            const updatePriceQuery = `UPDATE product_prices SET packing = CONCAT(packing, ', ', ?), price = ? WHERE code = ?`;
            await queryAsync(updatePriceQuery, [
              item.package,
              item.price * COURSE_EVRO_LEVA,
              item.code,
            ]);
          } else {
            const updatePriceQuery = `UPDATE product_prices SET price = ? WHERE code = ?`;
            await queryAsync(updatePriceQuery, [item.price, item.code]);
          }
          console.log("Item updated in prices");
        } else {
          const insertPriceQuery = `INSERT INTO product_prices (code, name, packing, unit, color, percentage_increase, price, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
          await queryAsync(insertPriceQuery, [
            item.code,
            item.description,
            item.package.toString(),
            item.unit,
            null,
            2.5,
            item.price * COURSE_EVRO_LEVA,
            "Други",
          ]);
          console.log("Item inserted in prices");
        }

        /* Update Product Storage */
        const storageItem = storageMap[item.code];
        if (storageItem) {
          const updateQuery = `UPDATE products_storage SET quantity = quantity + ? WHERE code = ? AND package = ?`;
          await queryAsync(updateQuery, [
            item.quantity,
            item.code,
            item.package,
          ]);
          console.log("Item updated in storage");
        } else {
          const insertQuery = `INSERT INTO products_storage (code, name, package, unit, quantity, category) VALUES (?, ?, ?, ?, ?, ?)`;
          await queryAsync(insertQuery, [
            item.code,
            item.description,
            item.package,
            item.unit,
            item.quantity,
            "Други",
          ]);
        }
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
