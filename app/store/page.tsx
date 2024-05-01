"use client";
import { headCells } from "@/store/utils/constants";
import { EnhancedTableHead } from "@/store/utils/enhancedTableHead";
import { EnhancedTableToolbar } from "@/store/utils/enhancedTableToolbar";
import { ProductEditor } from "@/store/utils/productEditor";
import {
  InvoiceProductData,
  Order,
  StoreProductData,
  StoreUnits,
} from "@/store/utils/types";
import { ADDStorage, createKey } from "@/store/utils/utils";
import { fetchJson } from "@/utils/fetchJson";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  ChangeEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Hourglass } from "react-loader-spinner";
import "./styles.css";
import FileUpload from "./utils/fileUpload";
import useToast from "./utils/useToast";

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
  const [productMap, setProductMap] = useState(
    new Map<string, StoreProductData>()
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StoreProductData[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof StoreProductData>("name");
  const [selected, setSelected] = useState<StoreProductData>();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [editMode, setEditMode] = useState(false);
  const [productsToUpdate, setProductsToUpdate] = useState<
    InvoiceProductData[] | null
  >(null);
  const [openCheckProductsDialog, setOpenCheckProductsDialog] = useState(false);
  const { Toast, setMessage } = useToast();

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
    setFilteredProducts(() =>
      sortedProducts.map((p) => ({
        ...p,
        total: p.unit === StoreUnits.pcs ? p.quantity : p.quantity * p.package,
      }))
    );
  };

  const isSelected = (code: string) => selected?.code === code;

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    sortAndFilterProducts(products, category);
  };

  const handleSearch = function (e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedCategory("all");
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(_searchTerm.toLowerCase())
    );
    setFilteredProducts(() =>
      filtered.map((p) => ({
        ...p,
        total: p.unit === StoreUnits.pcs ? p.quantity : p.quantity * p.package,
      }))
    );
  };

  const onEditSubmit = async (product: StoreProductData) => {
    try {
      await fetch("/api/get-storage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      }).then((response) => {
        if (!response.ok) return;
        const updatedProducts = products.map((p) =>
          p.code === product.code && p.package === product.package ? product : p
        );
        setProducts(updatedProducts);
        setSelected(undefined);
        setMessage({ severity: "success", text: "Product updated" });
      });
    } catch (error) {
      setMessage({ severity: "error", text: "Error updating product" });
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
  const uploadProductsHandler = async () => {
    if (!productsToUpdate) return;
    setIsFetching(true);

    try {
      const res = await ADDStorage(productsToUpdate);

      if (!res.ok) {
        setMessage({ text: "Error adding products", severity: "error" });
        setIsFetching(false);
        return;
      }

      const products = await fetchJson<StoreProductData[]>("/api/get-storage");
      if (!products.data) {
        setMessage({
          text: "Error fetching products: No data returned",
          severity: "error",
        });
        setIsFetching(false);
        return;
      }

      setProducts(products.data);
      const uniqueCategories = Array.from(
        new Set(products.data.map((p) => p.category))
      );
      setCategories(uniqueCategories);
      setMessage({
        text: `${productsToUpdate.length} products added successfully`,
        severity: "success",
      });
    } catch (error) {
      setMessage({ text: "Error updating products", severity: "error" });
    } finally {
      setProductsToUpdate(null);
      setOpenCheckProductsDialog(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchJson<StoreProductData[]>("/api/get-storage")
      .then((res) => {
        const { data } = res;
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(uniqueCategories);
        sortAndFilterProducts(data, "all");
      })
      .catch(() => {
        setMessage({ text: "Error fetching storage data", severity: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const map = new Map<string, StoreProductData>();
    setFilteredProducts(() =>
      products.map((p) => {
        setProductMap(map.set(`${p.code}-${p.package}`, p));
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

  useEffect(() => {
    if (productsToUpdate) {
      setOpenCheckProductsDialog(true);
    } else {
      setOpenCheckProductsDialog(false);
    }
  }, [productsToUpdate]);

  return (
    <Box margin={2}>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Toast />
          <Dialog
            open={openCheckProductsDialog}
            onClose={() => setOpenCheckProductsDialog(false)}
            fullWidth
            maxWidth="md"
          >
            {isFetching ? (
              <DialogTitle marginRight={4}>Обновяване на склада...</DialogTitle>
            ) : (
              <>
                <DialogTitle marginRight={4}>
                  Проверка на продуктите
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenCheckProductsDialog(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
            <DialogContent>
              {isFetching ? (
                <Grid className="store__hourglass-wrapper" container>
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    colors={["#306cce", "#72a1ed"]}
                  />
                </Grid>
              ) : (
                <Grid container direction="column" alignItems="center">
                  <DialogContentText variant="h5">
                    Брой продукти за добавяне: {productsToUpdate?.length}
                  </DialogContentText>
                  {productsToUpdate?.map((updatedProduct) => {
                    const key = `${updatedProduct.code}-${updatedProduct.package}`;
                    const storeProduct = productMap.get(key);
                    return (
                      <Fragment key={updatedProduct.code}>
                        <DialogContentText variant="h6">
                          {storeProduct ? (
                            <>
                              Код: {storeProduct.code}, Име: {storeProduct.name}
                              , Опаковка: {storeProduct.package}{" "}
                              {storeProduct.unit} - Количество:{" "}
                              <Typography
                                fontSize="1.25rem"
                                component="span"
                                className="text-blue-500"
                              >
                                {updatedProduct.quantity}
                              </Typography>
                              , Промяна:{" "}
                              <Typography
                                fontSize="1.25rem"
                                component="span"
                                className="text-red-500"
                              >
                                {storeProduct.quantity}
                              </Typography>{" "}
                              {"=>"}{" "}
                              <Typography
                                fontSize="1.25rem"
                                component="span"
                                className="text-green-500"
                              >
                                {storeProduct.quantity +
                                  updatedProduct.quantity}{" "}
                                {StoreUnits.pcs}
                              </Typography>
                            </>
                          ) : (
                            <>
                              Код: {updatedProduct.code}, Име:{" "}
                              {updatedProduct.description}, Опаковка:{" "}
                              {updatedProduct.package} {updatedProduct.unit},
                              Количество:{" "}
                              <Typography
                                fontSize="1.25rem"
                                component="span"
                                className="text-blue-500"
                              >
                                {updatedProduct.quantity} {StoreUnits.pcs}
                              </Typography>
                            </>
                          )}
                        </DialogContentText>
                      </Fragment>
                    );
                  })}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={uploadProductsHandler}
                  >
                    Прибави продуктите
                  </Button>
                </Grid>
              )}
            </DialogContent>
          </Dialog>
          <FileUpload
            data={productsToUpdate}
            setData={setProductsToUpdate}
            setOpenDialog={setOpenCheckProductsDialog}
          />
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
                          {row.package} {row.unit}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          {row.total} {row.unit}
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
