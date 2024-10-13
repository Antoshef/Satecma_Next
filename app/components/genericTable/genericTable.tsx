// GenericTable.tsx
import React, { MouseEvent, ChangeEvent } from 'react';
import { HeadCell, Order } from '@/products/utils/types';
import { EnhancedTableHead } from './enhancedTableHead';

interface GenericTableProps<T> {
  headCells: readonly HeadCell<T>[];
  order: Order;
  orderBy: keyof T;
  handleRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: MouseEvent<unknown>, item: T) => void;
  isSelected: (item: T) => boolean;
  selected: T[];
  filteredItems: readonly T[];
  visibleRows: T[];
  emptyRows: number;
}

const GenericTable = <T,>({
  headCells,
  order,
  orderBy,
  handleRequestSort,
  handleSelectAllClick,
  handleClick,
  isSelected,
  selected,
  filteredItems,
  visibleRows,
  emptyRows
}: GenericTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <EnhancedTableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
          numSelected={selected.length}
          rowCount={filteredItems.length}
        />
        <tbody>
          {visibleRows.map((row, index) => {
            const isItemSelected = isSelected(row);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <tr
                key={index}
                onClick={(event) => handleClick(event, row)}
                className={`cursor-pointer ${
                  isItemSelected
                    ? 'bg-theme-light-secondary text-theme-light-white dark:bg-theme-dark-secondary'
                    : ''
                }`}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={isItemSelected}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onChange={() => {}}
                    className="form-checkbox h-5 w-5 text-theme-light-primary dark:text-theme-dark-primary"
                    aria-labelledby={labelId}
                  />
                </td>
                {headCells.map((headCell) => (
                  <td
                    key={headCell.id as string}
                    className={`p-2 text-right ${headCell.numeric ? 'text-right' : 'text-left'}`}
                  >
                    {row[headCell.id] as string}
                  </td>
                ))}
              </tr>
            );
          })}
          {emptyRows > 0 && (
            <tr
              style={{
                height: 33 * emptyRows
              }}
            >
              <td colSpan={headCells.length + 1} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
