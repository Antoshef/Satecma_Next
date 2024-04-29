import { MouseEvent } from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order, StoreProductData } from "./types";

export interface EnhancedTableHeadProps {
  headCells: readonly {
    id: keyof StoreProductData;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
  }[];
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof StoreProductData
  ) => void;
  order: Order;
  orderBy: string;
}

export const EnhancedTableHead = ({
  order,
  orderBy,
  headCells,
  onRequestSort,
}: EnhancedTableHeadProps) => {
  const createSortHandler =
    (property: keyof StoreProductData) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
