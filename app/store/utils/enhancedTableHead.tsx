import { MouseEvent, ChangeEvent } from 'react';
import { HeadCell, Order } from './types';

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
  rowCount // Total row count
}: EnhancedTableHeadProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <thead className="bg-theme-light-background dark:bg-theme-dark-background">
      <tr>
        {/* Checkbox for selecting all rows */}
        <th className="p-2 flex">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-theme-light-primary dark:text-theme-dark-primary"
            checked={
              numSelected === 0
                ? false
                : rowCount > 0 && numSelected === rowCount
            } // Explicitly set to false when no items are selected
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
            className={`p-2 text-right text-xs font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary uppercase tracking-wider`}
          >
            <div
              className={`flex items-center ${headCell.centered ? 'justify-center' : 'justify-end'} cursor-pointer`}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className="ml-2">
                  {order === 'desc' ? (
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
