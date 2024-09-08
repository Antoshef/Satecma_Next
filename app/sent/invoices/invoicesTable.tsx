"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import { Download as DownloadIcon } from "@mui/icons-material"; // Import the download icon
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { IInvoice } from "../../../pages/api/create/invoice";
import { EnhancedTableHead, HeadCell } from "@/store/utils/enhancedTableHead";
import { Order } from "@/store/utils/types";
import { Company } from "@/create/invoice/constants";

interface InvoicesTableProps {
  data: IInvoice[];
}

const invoiceHeadCells: HeadCell<IInvoice>[] = [
  {
    id: "invoice_id",
    numeric: false,
    disablePadding: false,
    label: "Invoice ID",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  { id: "client", numeric: false, disablePadding: false, label: "Client" },
  { id: "eik", numeric: false, disablePadding: false, label: "EIK" },
  {
    id: "vat_number",
    numeric: false,
    disablePadding: false,
    label: "VAT Number",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  { id: "vat", numeric: true, disablePadding: false, label: "VAT" },
  { id: "total", numeric: true, disablePadding: false, label: "Total" },
  { id: "file_path", numeric: false, disablePadding: false, label: "Download" },
];

export default function InvoicesTable({ data }: InvoicesTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IInvoice>("invoice_id");
  const [selected, setSelected] = useState<IInvoice[]>([]);
  const [dense, setDense] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const isSelected = (invoice_id: string) =>
    selected.some((invoice) => invoice.invoice_id === invoice_id);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IInvoice,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data);
    } else {
      setSelected([]);
    }
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleClick = (event: MouseEvent<unknown>, row: IInvoice) => {
    const selectedIndex = selected.findIndex(
      (invoice) => invoice.invoice_id === row.invoice_id,
    );
    let newSelected: IInvoice[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      data
        .sort((a, b) =>
          order === "desc"
            ? a.invoice_id.localeCompare(b.invoice_id)
            : b.invoice_id.localeCompare(a.invoice_id),
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, page, rowsPerPage, data],
  );

  // Handle file download for a single PDF
  const handleDownload = (
    company: string,
    year: string,
    month: string,
    invoiceName: string,
  ) => {
    // Send the necessary parameters to the backend
    const link = document.createElement("a");
    link.href = `/api/invoices/download?company=${encodeURIComponent(company)}&year=${year}&month=${month}&invoiceName=${encodeURIComponent(invoiceName)}`;
    link.setAttribute("download", `${invoiceName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle downloading selected PDFs as a ZIP file
  const handleDownloadSelectedAsZip = async () => {
    const zip = new JSZip();

    // Add each selected invoice to the zip
    for (const invoice of selected) {
      try {
        const response = await fetch(invoice.file_path); // Fetch the file from the path
        const blob = await response.blob(); // Convert it to a Blob
        zip.file(`${invoice.invoice_id}.pdf`, blob); // Add the blob to the zip file
      } catch (error) {
        console.error(
          `Failed to fetch or add invoice ${invoice.invoice_id}: `,
          error,
        );
      }
    }

    // Generate the zip file and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "invoices.zip"); // Download the zip file
    });
  };

  return (
    <Box>
      {/* Button to download selected invoices as zip */}
      {selected.length > 1 && (
        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadSelectedAsZip}
          >
            Download Selected as ZIP
          </Button>
        </Grid>
      )}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table size={dense ? "small" : "medium"} sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              headCells={invoiceHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.invoice_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.invoice_id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.invoice_id}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.eik}</TableCell>
                    <TableCell>{row.vat_number}</TableCell>
                    <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.vat.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.total.toFixed(2)}</TableCell>
                    {/* New column for the download button */}
                    <TableCell align="center">
                      <Tooltip title="Download PDF">
                        <IconButton
                          aria-label="download invoice"
                          onClick={() =>
                            handleDownload(
                              "eko_invoices_sent",
                              new Date(row.date).toLocaleString("default", {
                                month: "long",
                              }),
                              new Date(row.date).getFullYear().toString(),
                              row.invoice_id,
                            )
                          }
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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
