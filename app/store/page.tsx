"use client";

import { headCells } from "@/store/utils/constants";
import { EnhancedTableHead } from "@/store/utils/enhancedTableHead";
import { EnhancedTableToolbar } from "@/store/utils/enhancedTableToolbar";
import { ProductEditor } from "@/store/utils/productEditor";
import {
  InvoiceProductData,
  Order,
  StoreProduct,
  StoreUnits,
} from "@/store/utils/types";
import { handleProductsMap } from "@/store/utils/utils";
import { fetchData } from "@/utils/fetchData";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import FileUpload from "./utils/fileUpload";
import useToast from "./utils/useToast";
import { Product } from "@/create/invoice/types";
import { ProductsDialog } from "./utils/productsDialog";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface Props {
  data: Product[];
}

export default function Store({ data }: Props) {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [productMap, setProductMap] = useState(new Map<string, StoreProduct>());
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StoreProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof StoreProduct>("name");
  const [selected, setSelected] = useState<StoreProduct[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [editMode, setEditMode] = useState(false);
  const [productsToUpdate, setProductsToUpdate] = useState<
    InvoiceProductData[] | null
  >(null);
  const [openCheckProductsDialog, setOpenCheckProductsDialog] = useState(false);
  const { Toast, notify } = useToast();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof StoreProduct,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleClick = (event: MouseEvent<unknown>, product: StoreProduct) => {
    const selectedIndex = selected.indexOf(product);
    let newSelected: StoreProduct[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = async () => {
    try {
      await fetchData("/api/products/delete", {
        method: "DELETE",
        body: JSON.stringify({ products: selected }),
      });
      const updatedProducts = products.filter(
        (product) => !selected.includes(product),
      );
      setProducts(updatedProducts);
      setSelected([]);
      notify("Products deleted", "success");
    } catch (error) {
      notify("Error deleting products", "error");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortAndFilterProducts = (
    products: StoreProduct[],
    category: string,
  ) => {
    let sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    if (category !== "all") {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === category,
      );
    }
    setFilteredProducts(sortedProducts);
  };

  const isSelected = (product: StoreProduct) =>
    selected.indexOf(product) !== -1;

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    sortAndFilterProducts(products, category);
    setPage(0);
  };

  const handleSearch = function (e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedCategory("all");
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(_searchTerm.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const onEditSubmit = async (product: StoreProduct) => {
    try {
      await fetchData("/api/products/get", {
        method: "PUT",
        body: JSON.stringify({ product }),
      });
      const updatedProducts = products.map((p) =>
        p.code === product.code && p.package === product.package ? product : p,
      );
      setProducts(updatedProducts);
      setSelected([]);
      notify("StoreProduct updated", "success");
    } catch (error) {
      notify("Error updating product", "error");
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      filteredProducts
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredProducts],
  );

  const uploadProductsHandler = async () => {
    if (!productsToUpdate) return;
    setIsFetching(true);
    try {
      await fetchData("/api/products/add", {
        method: "PUT",
        body: JSON.stringify({ items: productsToUpdate }),
      });
      const { data } = await fetchData<Product[]>("/api/products/get");
      setProducts(handleProductsMap(data));
      const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
      setCategories(uniqueCategories);
      notify(
        `${productsToUpdate.length} products added successfully`,
        "success",
      );
    } catch (error) {
      notify("Error updating products", "error");
    } finally {
      setProductsToUpdate(null);
      setOpenCheckProductsDialog(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category)),
    );
    setCategories(uniqueCategories);
    sortAndFilterProducts(products, "all");
  }, [products]);

  useEffect(() => {
    const map = new Map<string, StoreProduct>();
    const filtered = products.map((p) => {
      setProductMap(map.set(`${p.code}-${p.package}`, p));
      return {
        ...p,
        total: p.unit === StoreUnits.pcs ? p.quantity : p.quantity * p.package,
      };
    });
    setFilteredProducts(filtered);
  }, [products]);

  useEffect(() => {
    setEditMode(selected.length === 1);
  }, [selected]);

  useEffect(() => {
    if (productsToUpdate) {
      setOpenCheckProductsDialog(true);
    } else {
      setOpenCheckProductsDialog(false);
    }
  }, [productsToUpdate]);

  useEffect(() => {
    setProducts(handleProductsMap(data));
  }, [data]);

  return (
    <div className="m-4">
      <Toast />
      <ProductsDialog
        isOpen={openCheckProductsDialog}
        setIsOpen={setOpenCheckProductsDialog}
        onConfirm={uploadProductsHandler}
        isFetching={isFetching}
        productMap={productMap}
        productsToUpdate={productsToUpdate}
      />
      <FileUpload
        data={productsToUpdate}
        setData={setProductsToUpdate}
        setOpenDialog={setOpenCheckProductsDialog}
      />
      <div className="w-full mb-4 bg-white shadow rounded-lg">
        <EnhancedTableToolbar
          title="Склад"
          isSelected={!!selected.length}
          onEdit={setEditMode}
          onDelete={handleDelete}
        />
        <ProductEditor
          editMode={editMode}
          selected={selected[0]}
          setEditMode={setEditMode}
          onSubmit={onEditSubmit}
        />
        <div className="flex items-baseline p-4">
          <span className="mr-2 ml-2 text-lg">Избери категория:</span>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="ml-4 p-2 border rounded"
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
            className="ml-4 p-2 border rounded"
          />
        </div>
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
                      isItemSelected ? "bg-gray-100" : ""
                    }`}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={isItemSelected}
                        onChange={() => {}}
                        className="form-checkbox h-5 w-5 text-blue-600"
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
                      {(row.packagePrice * row.percentage_increase).toFixed(2)}{" "}
                      лв.
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
                    height: 33 * emptyRows,
                  }}
                >
                  <td colSpan={6} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center p-4">
          <div>
            <label className="mr-2">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border rounded p-2"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              className="p-2 border rounded mr-2"
            >
              Previous
            </button>
            <span>
              Page {page + 1} of{" "}
              {Math.ceil(filteredProducts.length / rowsPerPage)}
            </span>
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={
                page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1
              }
              className="p-2 border rounded ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
