'use client';
import { EnhancedTableHead } from '@/store/utils/enhancedTableHead';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import { RowsPerPage } from '@/components/rowsPerPage';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { HeadCell, Order } from '@/store/utils/types';
import { InvoiceData } from '@/create/invoice/types';
import Tooltip from '@/components/tooltip';
import Image from 'next/image';
import DownloadIcon from '/public/assets/svg/download-laptop.svg';

interface InvoicesTableProps {
  data: InvoiceData[];
}

const invoiceHeadCells: HeadCell<InvoiceData>[] = [
  {
    id: 'invoice_id',
    numeric: false,
    label: 'Фактура №'
  },
  { id: 'date', numeric: false, label: 'Дата' },
  { id: 'client', numeric: false, label: 'Клиент' },
  { id: 'eik', numeric: false, label: 'ЕИК' },
  {
    id: 'vat_number',
    numeric: false,
    label: 'ДДС №'
  },
  { id: 'amount', numeric: true, label: 'Сума' },
  { id: 'vat', numeric: true, label: 'ДДС' },
  { id: 'total', numeric: true, label: 'Общо' },
  { id: 'file_path', numeric: false, label: 'Изтегли', centered: true }
];

export default function InvoicesTable({ data }: InvoicesTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InvoiceData>('invoice_id');
  const [selected, setSelected] = useState<InvoiceData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const isSelected = (invoice_id: string) =>
    selected.some((invoice) => invoice.invoice_id === invoice_id);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof InvoiceData
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: MouseEvent<unknown>, row: InvoiceData) => {
    const selectedIndex = selected.findIndex(
      (invoice) => invoice.invoice_id === row.invoice_id
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
        selected.slice(selectedIndex + 1)
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

  const visibleRows = useMemo(() => {
    if (!data) return [] as InvoiceData[];
    return data
      .sort((a, b) =>
        order === 'desc'
          ? a.invoice_id.localeCompare(b.invoice_id)
          : b.invoice_id.localeCompare(a.invoice_id)
      )
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, page, rowsPerPage, data]);

  // Handle file download for a single PDF
  const handleDownload = (
    company: string,
    year: string,
    month: string,
    invoiceName: string
  ) => {
    // Send the necessary parameters to the backend
    const link = document.createElement('a');
    link.href = `/api/invoices/download?company=${encodeURIComponent(company)}&year=${year}&month=${month}&invoiceName=${encodeURIComponent(invoiceName)}`;
    link.setAttribute('download', `${invoiceName}.pdf`);
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
        const response = await fetch(invoice.file_path || ''); // Fetch the file from the path
        const blob = await response.blob(); // Convert it to a Blob
        zip.file(`${invoice.invoice_id}.pdf`, blob); // Add the blob to the zip file
      } catch (error) {
        console.error(
          `Неуспешно изтегляне или добавяне на фактура ${invoice.invoice_id}: `,
          error
        );
      }
    }

    // Generate the zip file and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'фактури.zip'); // Download the zip file
    });
  };

  if (!data.length) {
    return <h3 className="p-4">Няма намерени фактури</h3>;
  }

  return (
    <div className="p-4">
      {/* Button to download selected invoices as zip */}
      {selected.length > 1 && (
        <div className="flex justify-end mb-4">
          <button
            className="bg-theme-light-primary dark:bg-theme-dark-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary"
            onClick={handleDownloadSelectedAsZip}
          >
            Изтегли избраните като ZIP
          </button>
        </div>
      )}
      <div className="w-full mb-2 bg-theme-light-background dark:bg-theme-dark-background shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm rounded-xl overflow-hidden">
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
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row.invoice_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    key={row.invoice_id}
                    className={`cursor-pointer ${
                      isItemSelected
                        ? 'bg-theme-light-secondary text-theme-light-white dark:bg-theme-dark-secondary'
                        : ''
                    }`}
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={isItemSelected}
                        onChange={() => {}}
                        className="form-checkbox h-5 w-5 text-theme-light-primary dark:text-theme-dark-primary"
                        aria-labelledby={labelId}
                      />
                    </td>
                    <td className="p-2 text-right" id={labelId}>
                      {row.invoice_id}
                    </td>
                    <td className="p-2 text-right">{row.date}</td>
                    <td className="p-2 text-right">{row.client}</td>
                    <td className="p-2 text-right">{row.eik}</td>
                    <td className="p-2 text-right">{row.vat_number}</td>
                    <td className="p-2 text-right">{row.amount.toFixed(2)}</td>
                    <td className="p-2 text-right">{row.vat.toFixed(2)}</td>
                    <td className="p-2 text-right">{row.total.toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <Tooltip text="Изтегли">
                        <button
                          className="text-theme-light-primary dark:text-theme-dark-primary hover:text-theme-light-secondary dark:hover:text-theme-dark-secondary"
                          onClick={() =>
                            handleDownload(
                              'eko_invoices_sent',
                              new Date(row.date).toLocaleString('default', {
                                month: 'long'
                              }),
                              new Date(row.date).getFullYear().toString(),
                              row.invoice_id
                            )
                          }
                        >
                          <Image
                            src={DownloadIcon}
                            width={20}
                            height={20}
                            alt="Изтегли"
                          />
                        </button>
                      </Tooltip>
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
                  <td colSpan={10} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <RowsPerPage
          data={data}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
