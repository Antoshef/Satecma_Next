import { HeadCell } from "./types";

export const headCells: readonly HeadCell[] = [
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
    id: "package",
    numeric: true,
    disablePadding: false,
    label: "Опаковка",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Количество бр.",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Общо",
  },
];
