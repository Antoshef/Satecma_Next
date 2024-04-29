export function extractProductData(text: string) {
  const rows = text.split("\n");

  const quantityPricesPattern = /\d{1,},\d{2}/g;
  const codePattern = /\s\d{4}\s/;
  const packagePattern = /\d{1,3}x\d{1,3}/;

  const productRows = [];

  for (let row of rows) {
    const quantityPrices = row.matchAll(quantityPricesPattern);
    const code = row.match(codePattern);
    const packageSize = row.match(packagePattern);
    if (quantityPrices && code && packageSize) {
      productRows.push({
        quantity: quantityPrices.next().value[0],
        price: quantityPrices.next().value[0],
        code: code[0].trim(),
        package: packageSize[0].split("x")[1],
        total: quantityPrices.next().value[0],
      });
    }
  }

  return productRows;
}
