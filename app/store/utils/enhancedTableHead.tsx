import { MouseEvent, ChangeEvent } from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./types";

// Define a generic interface for head cells
export interface HeadCell<T> {
  id: keyof T;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

// Define generic props for the EnhancedTableHead component
export interface EnhancedTableHeadProps<T> {
  headCells: readonly HeadCell<T>[]; // Array of head cells specific to the data type
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  order: Order; // Sorting order ('asc' or 'desc')
  orderBy: keyof T; // The field currently being sorted by
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void; // New: select all functionality
  numSelected: number; // New: number of selected rows
  rowCount: number; // New: total number of rows
}

export const EnhancedTableHead = <T,>({
  order,
  orderBy,
  headCells,
  onRequestSort,
  onSelectAllClick, // Handle select all click
  numSelected, // Number of selected items
  rowCount, // Total row count
}: EnhancedTableHeadProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* Checkbox for selecting all rows */}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount} // If some rows are selected but not all
            checked={rowCount > 0 && numSelected === rowCount} // If all rows are selected
            onChange={onSelectAllClick} // Handle the select all click
            inputProps={{
              "aria-label": "select all invoices",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
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
