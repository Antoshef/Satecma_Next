'use client';
import { EnhancedTableToolbar } from '@/components/genericTable/enhancedTableToolbar';
import GenericTable from '@/components/genericTable/genericTable';
import { RowsPerPage } from '@/components/rowsPerPage';
import Tooltip from '@/components/tooltip';
import { InvoiceData } from '@/create/invoice/types';
import { HeadCell, EnhancedMode, Order } from '@/products/utils/types';
import { getComparator } from '@/utils/getComparator';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import DownloadIcon from '/public/assets/svg/download-laptop.svg';
import useToast from '@/products/utils/useToast';

interface InvoicesTableProps {
  data: InvoiceData[];
  error?: string;
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

export default function InvoicesTable({ data, error }: InvoicesTableProps) {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof InvoiceData>('invoice_id');
  const [selected, setSelected] = useState<InvoiceData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [mode, setMode] = useState<EnhancedMode>(EnhancedMode.None);

  const { ToastContainer, notify } = useToast();

  useEffect(() => {
    if (error) {
      notify('Възникна грешка при зареждане на фактурите', 'error');
    } else {
      setInvoices(data);
    }
  }, [data, error, notify]);

  const isSelected = (invoice_id: string) =>
    selected.some((invoice) => invoice.invoice_id === invoice_id);

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
      setSelected(invoices);
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
    if (!invoices) return [] as InvoiceData[];
    return invoices
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, invoices]);

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

  if (!invoices.length) {
    return <h3 className="p-4">Няма намерени фактури</h3>;
  }

  return (
    <div className="m-4">
      <ToastContainer />
      <div className="w-full rounded-b-xl bg-theme-light-background dark:bg-theme-dark-background shadow">
        <EnhancedTableToolbar
          title="Фактури"
          isSelected={!!selected.length}
          setMode={setMode}
          deleteHandler={() => {
            // Implement delete functionality here
            console.log('Delete handler triggered');
          }}
          selectedCount={selected.length}
        />
        <div className="flex justify-end mb-4">
          {selected.length > 1 && (
            <button
              className="bg-theme-light-primary dark:bg-theme-dark-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary"
              onClick={handleDownloadSelectedAsZip}
            >
              Изтегли избраните като ZIP
            </button>
          )}
        </div>
        <GenericTable<InvoiceData>
          headCells={invoiceHeadCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          isSelected={(invoice) => isSelected(invoice.invoice_id)}
          selected={selected}
          filteredItems={invoices}
          visibleRows={visibleRows}
          emptyRows={Math.max(0, (1 + page) * rowsPerPage - invoices.length)}
        />
        <RowsPerPage
          data={invoices}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
