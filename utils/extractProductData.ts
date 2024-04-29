import { ProductRowsData } from "@/store/utils/types";

export function extractProductData(text: string) {
  const rows = text.split("\n");

  const quantityPricesPattern = /\d{1,},\d{2}/g;
  const codePattern = /\s\d{4}\s/;
  const packagePattern = /\d{1,3}x\d{1,3}/;

  const productRows: ProductRowsData[] = [];

  for (let row of rows) {
    const quantityPrices = row.matchAll(quantityPricesPattern);
    const code = row.match(codePattern);
    const packageSize = row.match(packagePattern);
    if (quantityPrices && code && packageSize) {
      productRows.push({
        quantity: Number(quantityPrices.next().value[0].replace(",", ".")),
        price: Number(quantityPrices.next().value[0].replace(",", ".")),
        code: code[0].trim(),
        package: Number(packageSize[0].split("x")[1]),
      });
    }
  }

  return productRows;
}
