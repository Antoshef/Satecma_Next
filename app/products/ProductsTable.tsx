'use client';

import { EnhancedTableToolbar } from '@/components/genericTable/enhancedTableToolbar';
import GenericTable from '@/components/genericTable/genericTable';
import { RowsPerPage } from '@/components/rowsPerPage';
import { baseUrl } from '@/constants';
import { headCells } from '@/products/utils/constants';
import { ProductEditor } from '@/products/utils/productEditor';
import { EnhancedMode, Order, Product } from '@/products/utils/types';
import { getComparator } from '@/utils/getComparator';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import useToast from './utils/useToast';

interface Props {
  data: Product[];
  error?: string;
}

export default function ProductsTable({ data, error }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [selected, setSelected] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [mode, setMode] = useState<EnhancedMode>(EnhancedMode.None);

  const { ToastContainer, notify } = useToast();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredProducts.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortAndFilterProducts = (products: Product[], category: string) => {
    let sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    if (category !== 'all') {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === category
      );
    }
    setFilteredProducts(sortedProducts);
  };

  const isSelected = (code: string) =>
    selected.some((product) => product.code === code);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    sortAndFilterProducts(products, category);
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory('all');
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(_searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      filteredProducts
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredProducts]
  );

  const onEditSubmit = async (product: Product) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${product.code}`, {
        method: 'PUT',
        body: JSON.stringify({ product }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Възникна грешка при обновяване на продукт'
        );
      }

      const updatedProducts = products.map((p) =>
        p.code === product.code ? product : p
      );
      setFilteredProducts(updatedProducts);
      setSelected([]);
      notify('Product updated', 'success');
    } catch (error) {
      notify(
        (error as Error)?.message ||
          'Възникна грешка при обновяване на продукт',
        'error'
      );
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'DELETE',
        body: JSON.stringify({ products: selected }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Грешка при изтриване на продукт');
      }

      const updatedProducts = products.filter(
        (product) => !selected.includes(product)
      );
      setFilteredProducts(updatedProducts);
      setSelected([]);
      notify('Успешно изтрихте продукт', 'success');
    } catch (error) {
      notify('Възникна грешка при изтриване на продукт', 'error');
    }
  };

  const createHandler = async (product: Product) => {
    try {
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        body: JSON.stringify({ product }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Възникна грешка при създаване на продукт'
        );
      }

      const updatedProducts = [...products, product];
      setFilteredProducts(updatedProducts);
      setSelected([]);
      notify('Успешно създадохте продукт', 'success');
    } catch (error) {
      notify('Възникна грешка при създаване на продукт', 'error');
    }
  };

  const submitHandler = async (product: Product) => {
    switch (mode) {
      case EnhancedMode.Edit:
        onEditSubmit(product);
        break;
      case EnhancedMode.Create:
        createHandler(product);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter((c) => c !== undefined))
    );
    setFilteredProducts(products);
    setCategories(uniqueCategories);
    sortAndFilterProducts(products, 'all');
  }, [products]);

  useEffect(() => {
    if (error) {
      notify('Възникна грешка при зареждане на продуктите', 'error');
    } else {
      setProducts(data);
    }
  }, [data, error, notify]);

  return (
    <div className="m-4">
      <ToastContainer />
      <div className="w-full rounded-b-xl bg-theme-light-background dark:bg-theme-dark-background shadow">
        <EnhancedTableToolbar
          title="Продукти"
          isSelected={!!selected.length}
          setMode={setMode}
          deleteHandler={deleteHandler}
          selectedCount={selected.length}
        />
        <ProductEditor
          mode={mode}
          selected={selected[0]}
          categories={categories}
          setMode={setMode}
          onSubmit={submitHandler}
        />
        <div className="flex items-baseline p-4">
          <span className="mr-2 ml-2 text-lg text-theme-light-primary dark:text-theme-dark-primary">
            Избери категория:
          </span>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="ml-4 p-2 border rounded text-theme-light-primary dark:text-theme-dark-primary bg-theme-light-background dark:bg-theme-dark-background border-theme-light-secondary dark:border-theme-dark-secondary"
          >
            <option key="all" value="all">
              Всички
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Търси по име"
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4 p-2 border rounded text-theme-light-primary dark:text-theme-dark-primary bg-theme-light-background dark:bg-theme-dark-background border-theme-light-secondary dark:border-theme-dark-secondary"
          />
        </div>
        <GenericTable<Product>
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={(event, product) =>
            setSelected((state) => {
              if (state.some((p) => p.code === product.code)) {
                return state.filter((p) => p.code !== product.code);
              } else {
                return [...state, product];
              }
            })
          }
          isSelected={(product) => isSelected(product.code)}
          selected={selected}
          filteredItems={filteredProducts}
          visibleRows={visibleRows}
          emptyRows={emptyRows}
        />
        <RowsPerPage
          data={filteredProducts}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
