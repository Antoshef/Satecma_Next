import { Product } from "@/create/invoice/types";
import { InvoiceProductData, StoreProductData } from "@/store/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";

const COURSE_EVRO_LEVA = 2;
const ITEM_PREFIX = (code: string, _package: number) => `${code}:${_package}`;

interface ProcessPriceItemProps {
  item: InvoiceProductData;
  priceMap: Record<string, Product>;
}

const processPriceItem = async ({ item, priceMap }: ProcessPriceItemProps) => {
  /* Update Product Prices */
  const priceItem = priceMap[item.code];
  if (priceItem) {
    const packageIncluded = priceItem.packing.includes(item.package.toString());
    if (packageIncluded) {
      const query = `UPDATE product_prices SET packing = CONCAT(packing, ', ', ?), price = ? WHERE code = ?`;
      const params = [
        item.package.toString(),
        item.price * COURSE_EVRO_LEVA,
        item.code,
      ];
      await queryAsync(query, params);
    } else {
      const query = `UPDATE product_prices SET price = ? WHERE code = ?`;
      const params = [item.price * COURSE_EVRO_LEVA, item.code];
      await queryAsync(query, params);
    }
    console.log("Item updated in prices");
  } else {
    const query = `INSERT INTO product_prices (code, name, packing, unit, color, percentage_increase, price, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      item.code,
      item.description,
      item.package.toString(),
      item.unit,
      null,
      2.5,
      item.price * COURSE_EVRO_LEVA,
      "Други",
    ];
    await queryAsync(query, params);
  }
  console.log("Item added in prices");
};

interface ProcessStoreItemProps {
  item: InvoiceProductData;
  storageMap: Record<string, StoreProductData>;
}

const processStoreItem = async ({
  item,
  storageMap,
}: ProcessStoreItemProps) => {
  const storageItem = storageMap[ITEM_PREFIX(item.code, item.package)];
  if (storageItem) {
    const query = `UPDATE products_storage SET quantity = quantity + ? WHERE code = ? AND package = ?`;
    const params = [item.quantity, item.code, item.package];
    queryAsync(query, params);
  } else {
    const query = `INSERT INTO products_storage (code, name, package, unit, quantity, category) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      item.code,
      item.description,
      item.package,
      item.unit,
      item.quantity,
      "Други",
    ];
    queryAsync(query, params);
  }
  console.log("Item added in storage");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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

      const error = items.some(
        (item) =>
          !item.code ||
          !item.package ||
          !item.unit ||
          !item.description ||
          !item.totalQuantity,
      );
      if (error) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const priceQuery = `SELECT * FROM product_prices`;
      const productPrices = await queryAsync<Product[]>(priceQuery);
      const storageQuery = `SELECT * FROM products_storage`;
      const productStorage = await queryAsync<StoreProductData[]>(storageQuery);

      const storageMap = productStorage.reduce(
        (acc, item) => {
          acc[ITEM_PREFIX(item.code, item.package)] = item;
          return acc;
        },
        {} as Record<string, StoreProductData>,
      );
      const priceMap = productPrices.reduce(
        (acc, item) => {
          acc[item.code] = item;
          return acc;
        },
        {} as Record<string, Product>,
      );

      for (const item of items) {
        await processPriceItem({ item, priceMap });
        await processStoreItem({ item, storageMap });
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
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
