import { HeadCell, StoreProduct } from "./types";

export const headCells: readonly HeadCell<StoreProduct>[] = [
  {
    id: "code",
    numeric: true,
    disablePadding: false,
    label: "Код",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Продукт",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Цена кг./л./бр.",
  },
  {
    id: "packagePrice",
    numeric: true,
    disablePadding: true,
    label: "Цена опаковка",
  },
  {
    id: "package",
    numeric: true,
    disablePadding: false,
    label: "Опаковка",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Количество",
  },
  {
    id: "totalQuantity",
    numeric: true,
    disablePadding: false,
    label: "Общо",
  },
];
