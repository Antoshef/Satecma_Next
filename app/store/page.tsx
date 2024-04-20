"use client";
import { useState, useMemo, ChangeEvent, MouseEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { headCells } from "components/store/constants";
import {
  Grid,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ProductEditor } from "components/store/productEditor";
import { EnhancedTableToolbar } from "components/store/enhancedTableToolbar";
import { EnhancedTableHead } from "components/store/enhancedTableHead";
import { createKey, unitsMapCyrilic } from "components/store/utils";
import { Order, StoreProductData, StoreUnits } from "@/components/store/types";
import { fetchJson } from "@/utils/fetchJson";
import "./store.css";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Store() {
  const [products, setProducts] = useState<StoreProductData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StoreProductData[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof StoreProductData>("name");
  const [selected, setSelected] = useState<StoreProductData>();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [editMode, setEditMode] = useState(false);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof StoreProductData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const sortAndFilterProducts = (
    products: StoreProductData[],
    category: string
  ) => {
    let sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    if (category !== "all") {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === category
      );
    }
    setFilteredProducts(sortedProducts);
  };

  const isSelected = (code: number) => selected?.code === code;

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    sortAndFilterProducts(products, category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory("all");
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(_searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onEditSubmit = async (product: StoreProductData) => {
    try {
      await fetch("/update-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const updatedProducts = products.map((p) =>
        p.code === product.code && p.package === product.package ? product : p
      );
      setProducts(updatedProducts);
      setSelected(undefined);
    } catch (error) {
      console.error("Error updating product: ", error);
    } finally {
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
    [order, orderBy, page, rowsPerPage, filteredProducts]
  );

  useEffect(() => {
    setLoading(true);
    fetchJson<StoreProductData[]>("/api/get-storage")
      .then((data) => {
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);

        sortAndFilterProducts(data, "all");
      })
      .catch((error) => {
        console.error("Error fetching storage data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(() =>
      products.map((p) => {
        return {
          ...p,
          total:
            p.unit === StoreUnits.pcs ? p.quantity : p.quantity * p.package,
        };
      })
    );
  }, [products]);

  useEffect(() => {
    setEditMode(!!selected);
  }, [selected]);

  return (
    <Box margin={2}>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              isSelected={!!selected}
              onEdit={setEditMode}
            />
            <ProductEditor
              editMode={editMode}
              selected={selected}
              setEditMode={setEditMode}
              onSubmit={onEditSubmit}
            />
            <Grid container alignItems="baseline">
              <Typography
                variant="body1"
                component="span"
                marginRight={2}
                marginLeft={2}
              >
                Избери категория:
              </Typography>
              <Select
                id="category-select"
                onChange={handleCategoryChange}
                value={selectedCategory}
                variant="filled"
              >
                <MenuItem key="all" value="all">
                  Всички
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              <Input
                type="text"
                placeholder="Търси по име"
                value={searchTerm}
                onChange={handleSearch}
                className="store__search-input"
              />
            </Grid>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  headCells={headCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.code);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={() =>
                          setSelected((state) => {
                            if (state === row) {
                              setEditMode(false);
                              return undefined;
                            } else {
                              return row;
                            }
                          })
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={createKey(row)}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {row.package} {unitsMapCyrilic[row.unit]}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          {row.total} {unitsMapCyrilic[row.unit]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </>
      )}
    </Box>
  );
}
