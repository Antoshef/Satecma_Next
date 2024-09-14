"use client";

import { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import DownloadIcon from "/public/assets/svg/download.svg";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { EnhancedTableHead, HeadCell } from "@/store/utils/enhancedTableHead";
import { Order } from "@/store/utils/types";
import { InvoiceData } from "@/create/invoice/types";
import Image from "next/image";
import Tooltip from "@/components/tooltip";

interface InvoicesTableProps {
  data: InvoiceData[];
}

const invoiceHeadCells: HeadCell<InvoiceData>[] = [
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
  const [orderBy, setOrderBy] = useState<keyof InvoiceData>("invoice_id");
  const [selected, setSelected] = useState<InvoiceData[]>([]);
  const [dense, setDense] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const isSelected = (invoice_id: string) =>
    selected.some((invoice) => invoice.invoice_id === invoice_id);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof InvoiceData,
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

  const handleClick = (event: MouseEvent<unknown>, row: InvoiceData) => {
    const selectedIndex = selected.findIndex(
      (invoice) => invoice.invoice_id === row.invoice_id,
    );
    let newSelected: InvoiceData[] = [];

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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
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
        const response = await fetch(invoice.file_path || ""); // Fetch the file from the path
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
    <div className="p-4">
      {/* Button to download selected invoices as zip */}
      {selected.length > 1 && (
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={handleDownloadSelectedAsZip}
          >
            Download Selected as ZIP
          </button>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg mb-4">
        <div className="overflow-x-auto">
          <table className={`min-w-full ${dense ? "text-sm" : "text-base"}`}>
            <EnhancedTableHead
              headCells={invoiceHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={data.length}
            />
            <tbody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.invoice_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    key={row.invoice_id}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      isItemSelected ? "bg-gray-200" : ""
                    }`}
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isItemSelected}
                        onChange={() => {}}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        aria-labelledby={labelId}
                      />
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      id={labelId}
                      scope="row"
                    >
                      {row.invoice_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.eik}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.vat_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.vat.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Tooltip text="Download">
                        <button
                          className="text-blue-600 hover:text-blue-800"
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
                          <Image src={DownloadIcon} alt="Download" />
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center p-4">
          <div>
            <label className="mr-2">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border border-gray-300 rounded-md p-2"
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
              className="px-4 py-2 border border-gray-300 rounded-md mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Dense padding</label>
        <input
          type="checkbox"
          checked={dense}
          onChange={handleChangeDense}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
    </div>
  );
}
