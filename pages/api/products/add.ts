import { Product } from "@/create/invoice/types";
import { InvoiceProductData } from "@/store/utils/types";
import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";

const COURSE_EVRO_LEVA = 2;

interface ProcessItemProps {
  item: InvoiceProductData;
  itemMap: Record<string, Product>;
}

const processItem = async ({ item, itemMap }: ProcessItemProps) => {
  const mappedItem = itemMap[item.code];
  if (mappedItem) {
    const packageIndex = mappedItem.packing
      .split(",")
      .indexOf(item.package.toString());
    const currentItemQuantity = mappedItem.quantity.split(",").map(Number);
    currentItemQuantity[packageIndex] += item.quantity;
    if (packageIndex !== -1) {
      const query = `UPDATE products SET price = ?, quantity = ? WHERE code = ?`;
      const params = [
        item.price * COURSE_EVRO_LEVA,
        currentItemQuantity.join(", "),
        item.code,
      ];
      await queryAsync(query, params);
      console.log("Item updated NOT FOUND", item.description);
    } else {
      let packing = mappedItem.packing.split(",").map(Number);
      let quantity = mappedItem.quantity.split(",").map(Number);

      const newPackage = Number(item.package);
      const newQuantity = Number(item.quantity);

      const existingIndex = packing.indexOf(newPackage);
      if (existingIndex !== -1) {
        quantity[existingIndex] += newQuantity;
      } else {
        packing.push(newPackage);
        quantity.push(newQuantity);
      }

      const packingWithQuantity = packing.map((pack, index) => ({
        pack,
        qty: quantity[index],
      }));

      packingWithQuantity.sort((a, b) => a.pack - b.pack);

      packing = packingWithQuantity.map((item) => item.pack);
      quantity = packingWithQuantity.map((item) => item.qty);

      const query = `UPDATE products SET price = ?, packing = ?, quantity = ? WHERE code = ?`;
      const params = [
        item.price * COURSE_EVRO_LEVA,
        packing.join(", "),
        quantity.join(", "),
        item.code,
      ];

      await queryAsync(query, params);
      console.log("Item updated FOUND", item.description);
    }
  } else {
    const query = `INSERT INTO products (code, name, packing, unit, color, percentage_increase, price, category, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      item.code,
      item.description,
      item.package.toString(),
      item.unit,
      "",
      2.2,
      item.price * COURSE_EVRO_LEVA,
      "Други",
      item.quantity.toString(),
    ];
    await queryAsync(query, params);
    const updatedItemMap = {
      ...itemMap,
      [item.code]: {
        code: item.code,
        name: item.description,
        packing: item.package.toString(),
        unit: item.unit,
        color: "",
        percentage_increase: 2.2,
        price: item.price * COURSE_EVRO_LEVA,
        category: "Други",
        quantity: item.quantity.toString(),
      },
    };
    console.log("Item added");
    return updatedItemMap;
  }
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

      const query = `SELECT * FROM products`;
      const products = await queryAsync<Product[]>(query);

      let itemMap = products.reduce(
        (acc, item) => {
          acc[item.code] = item;
          return acc;
        },
        {} as Record<string, Product>,
      );

      for (const item of items) {
        const updatedItemMap = await processItem({ item, itemMap });
        if (updatedItemMap) {
          itemMap = updatedItemMap;
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
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
