"use client";
import { getComparator } from "@/store/page";
import { EnhancedTableHead } from "@/store/utils/enhancedTableHead";
import { EnhancedTableToolbar } from "@/store/utils/enhancedTableToolbar";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { headCells } from "./utils/constants";
import { Client } from "./utils/types";
import { ClientEditor } from "./utils/clientEditor";
import useToast from "@/store/utils/useToast";
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";

const createKey = (client: Client) => `${client.name}-${client.eik}`;

interface PageProps {
  data: Client[];
}

export default function ClientsPage({ data }: PageProps) {
  const [filteredClients, setFilteredClients] = useState(data);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Client>("name");
  const [selected, setSelected] = useState<Client | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { Toast, setMessage } = useToast();

  const isSelected = (eik: string) => selected?.eik === eik;

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Client,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = function (e: React.ChangeEvent<HTMLInputElement>) {
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = data.filter((client) =>
      client.name.toLowerCase().includes(_searchTerm.toLowerCase()),
    );
    setFilteredClients(filtered);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEditSubmit = async (client: Client) => {
    try {
      await fetchData("/api/clients", {
        method: "PUT",
        body: JSON.stringify(client),
      });
      const index = filteredClients.findIndex((c) => c.eik === client.eik);
      if (index >= 0) {
        const newClients = [...filteredClients];
        newClients[index] = client;
        setFilteredClients(newClients);
      }
      setEditMode(false);
      setMessage({
        text: "Клиентът е редактиран успешно",
        severity: "success",
      });
    } catch (error) {
      setMessage({
        text: "Грешка при редакцията на клиента",
        severity: "error",
      });
    }
  };

  const linkClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredClients.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      filteredClients
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredClients],
  );

  useEffect(() => {
    setEditMode(!!selected);
  }, [selected]);

  return (
    <Box>
      <Toast />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          title="Клиенти"
          isSelected={!!selected}
          onEdit={setEditMode}
        />
        <ClientEditor
          editMode={editMode}
          selected={selected}
          onSubmit={onEditSubmit}
          setEditMode={setEditMode}
        />
        <Grid container alignItems="baseline">
          <Typography
            variant="body1"
            component="span"
            marginRight={2}
            marginLeft={2}
          >
            Намери клиент:
          </Typography>
          <Input
            type="text"
            placeholder="Търси по име"
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4"
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
              onSelectAllClick={() => {}}
              numSelected={0}
              rowCount={filteredClients.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.eik);
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
                    className="cursor-pointer"
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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        onClick={linkClickHandler}
                        href={`tel:${row.phone}`}
                      >
                        {row.phone}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        onClick={linkClickHandler}
                        target="_blank"
                        href={`mailto:${row.email}`}
                      >
                        {row.email}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.director}</TableCell>
                    <TableCell align="right">{row.eik}</TableCell>
                    <TableCell align="right">{row.vat}</TableCell>
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
          count={filteredClients.length}
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
    </Box>
  );
}
