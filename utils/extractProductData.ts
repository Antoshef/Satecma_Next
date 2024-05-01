import {
  InvoiceProductData,
  SpanishUnits,
  StoreUnits,
} from "@/store/utils/types";
import { spanishUnitsMap } from "@/store/utils/utils";

export function extractProductData(text: string) {
  const rows = text.split("\n");

  const pattern =
    /(\d{1,},\d{2})\s+([LKU])\s+(\d{1,3}x\d{1,3})\s+(\d{4})\s+([\w\s.-]+?(?=\s+\d{1,3},\d{2}))\s+(\d{1,},\d{2})\s+(\d{1,},\d{2})/g;

  const productRows: InvoiceProductData[] = [];

  for (let row of rows) {
    const matches = Array.from(row.matchAll(pattern));
    for (const match of matches) {
      const [_, quantity, unit, packageSize, code, description, price, total] =
        match;
      productRows.push({
        totalQuantity: Number(quantity.replace(/,/g, ".")),
        unit: spanishUnitsMap[unit as SpanishUnits] as StoreUnits,
        quantity: Number(packageSize.split("x")[0]),
        package: Number(packageSize.split("x")[1]),
        code,
        description: description.trim(),
        price: Number(price.replace(",", ".")),
        totalPrice: Number(total.replace(/,/g, ".")),
      });
    }
  }

  return productRows;
}
