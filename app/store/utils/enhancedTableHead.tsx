import { MouseEvent, ChangeEvent } from "react";
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
    <thead className="bg-gray-50">
      <tr>
        {/* Checkbox for selecting all rows */}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={rowCount > 0 && numSelected === rowCount} // If all rows are selected
            ref={(input) => {
              if (input)
                input.indeterminate = numSelected > 0 && numSelected < rowCount;
            }} // If some rows are selected but not all
            onChange={onSelectAllClick} // Handle the select all click
            aria-label="select all invoices"
          />
        </th>
        {headCells.map((headCell, index) => (
          <th
            key={`${(headCell.id, index)}`}
            className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${
              headCell.disablePadding ? "p-0" : "p-4"
            }`}
          >
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className="ml-2">
                  {order === "desc" ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  )}
                </span>
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
