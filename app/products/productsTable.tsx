import React, { MouseEvent, ChangeEvent } from 'react';
import { EnhancedTableHead } from '@/products/utils/enhancedTableHead';
import { Product, Order, HeadCell } from '@/products/utils/types';
import { headCells } from '@/products/utils/constants';

interface ProductsTableProps {
  headCells: readonly HeadCell<Product>[];
  order: Order;
  orderBy: keyof Product;
  handleRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof Product
  ) => void;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: MouseEvent<unknown>, product: Product) => void;
  isSelected: (product: Product) => boolean;
  selected: Product[];
  filteredProducts: Product[];
  visibleRows: Product[];
  emptyRows: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  order,
  orderBy,
  handleRequestSort,
  handleSelectAllClick,
  handleClick,
  isSelected,
  selected,
  filteredProducts,
  visibleRows,
  emptyRows
}) => {
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
          rowCount={filteredProducts.length}
        />
        <tbody>
          {visibleRows.map((row, index) => {
            const isItemSelected = isSelected(row);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <tr
                key={row.code + index}
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
                    onChange={(e) => e.preventDefault()}
                    className="form-checkbox h-5 w-5 text-theme-light-primary dark:text-theme-dark-primary"
                    aria-labelledby={labelId}
                  />
                </td>
                {headCells.map((headCell) => (
                  <td
                    key={headCell.id as string}
                    className={`p-2 text-right ${headCell.numeric ? 'text-right' : 'text-left'}`}
                  >
                    {row[headCell.id]}
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

export default ProductsTable;
