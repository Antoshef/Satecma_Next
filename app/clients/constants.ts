import { HeadCell } from "@/store/utils/types";
import { Client } from "./types";

export const headCells: readonly HeadCell<Client>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Име",
  },
  { id: "phone", numeric: false, disablePadding: false, label: "Телефон" },
  { id: "email", numeric: false, disablePadding: false, label: "Имейл" },
  { id: "city", numeric: false, disablePadding: false, label: "Град" },
  { id: "address", numeric: false, disablePadding: false, label: "Адрес" },
  {
    id: "director",
    numeric: false,
    disablePadding: false,
    label: "Директор",
  },
  {
    id: "eik",
    numeric: true,
    disablePadding: false,
    label: "ЕИК",
  },
  {
    id: "vat",
    numeric: false,
    disablePadding: false,
    label: "ДДС",
  },
];
