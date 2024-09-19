import React, { MouseEvent, ChangeEvent } from 'react';
import { EnhancedTableHead } from '@/products/utils/enhancedTableHead';
import { StoreProduct, Order, HeadCell } from '@/products/utils/types';

interface ProductsTableProps {
  headCells: readonly HeadCell<StoreProduct>[];
  order: Order;
  orderBy: keyof StoreProduct;
  handleRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof StoreProduct
  ) => void;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (event: MouseEvent<unknown>, product: StoreProduct) => void;
  isSelected: (product: StoreProduct) => boolean;
  selected: StoreProduct[];
  filteredProducts: StoreProduct[];
  visibleRows: StoreProduct[];
  emptyRows: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  headCells,
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
                <td className="p-2 text-right">{row.code}</td>
                <td className="p-2 text-right" id={labelId}>
                  {row.name}
                </td>
                <td className="p-2 text-right">
                  {(row.price * row.percentage_increase).toFixed(2)} лв.
                </td>
                <td className="p-2 text-right">
                  {(row.packagePrice * row.percentage_increase).toFixed(2)} лв.
                </td>
                <td className="p-2 text-right">
                  {row.package} {row.unit}
                </td>
                <td className="p-2 text-right">{row.quantity} бр.</td>
                <td className="p-2 text-right">
                  {row.totalQuantity} {row.unit}
                </td>
              </tr>
            );
          })}
          {emptyRows > 0 && (
            <tr
              style={{
                height: 33 * emptyRows
              }}
            >
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
