'use client';
import { RowsPerPage } from '@/components/rowsPerPage';
import { EnhancedTableHead } from '@/products/utils/enhancedTableHead';
import { EnhancedTableToolbar } from '@/products/utils/enhancedTableToolbar';
import useToast from '@/products/utils/useToast';
import { getComparator } from '@/utils/getComparator';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';
import { ClientEditor } from './utils/clientEditor';
import { headCells } from './utils/constants';
import { Client } from './utils/types';

const createKey = (client: Client) => `${client.name}-${client.eik}`;

interface PageProps {
  data: Client[];
}

export default function ClientsTable({ data }: PageProps) {
  const [filteredClients, setFilteredClients] = useState(data);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Client>('name');
  const [selected, setSelected] = useState<Client[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { Toast, notify } = useToast();

  const isSelected = (eik: string) =>
    selected.some((client) => client.eik === eik);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Client
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

  const handleSearch = function (e: React.ChangeEvent<HTMLInputElement>) {
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = data.filter((client) =>
      client.name.toLowerCase().includes(_searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEditSubmit = async (client: Client) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Something went wrong';
        throw new Error(errorMessage + ` (Status ${response.status})`);
      }

      const index = filteredClients.findIndex((c) => c.eik === client.eik);
      if (index >= 0) {
        const newClients = [...filteredClients];
        newClients[index] = client;
        setFilteredClients(newClients);
      }
      setEditMode(false);
      notify('Клиентът е редактиран успешно', 'success');
    } catch (error) {
      notify('Грешка при редакцията на клиента', 'error');
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
    [order, orderBy, page, rowsPerPage, filteredClients]
  );

  return (
    <div className="p-4">
      <Toast />
      <div className="w-full rounded-b-xl bg-theme-light-background dark:bg-theme-dark-background shadow">
        <EnhancedTableToolbar
          title="Клиенти"
          isSelected={selected.length > 0}
          onEdit={setEditMode}
          selectedCount={selected.length}
        />
        <ClientEditor
          editMode={editMode}
          selected={selected[0]}
          onSubmit={onEditSubmit}
          setEditMode={setEditMode}
        />
        <div className="flex items-baseline p-4">
          <span className="mr-2 ml-2 text-lg text-theme-light-primary dark:text-theme-dark-primary">
            Намери клиент:
          </span>
          <input
            type="text"
            placeholder="Търси по име"
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4 p-2 border rounded text-theme-light-primary dark:text-theme-dark-primary bg-theme-light-background dark:bg-theme-dark-background border-theme-light-secondary dark:border-theme-dark-secondary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className={'min-w-full text-sm'}>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={filteredClients.length}
            />
            <tbody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.eik);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    key={createKey(row)}
                    onClick={() =>
                      setSelected((state) => {
                        if (state.some((client) => client.eik === row.eik)) {
                          setEditMode(false);
                          return state.filter(
                            (client) => client.eik !== row.eik
                          );
                        } else {
                          return [...state, row];
                        }
                      })
                    }
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
                        onChange={() => {}}
                        className="form-checkbox h-5 w-5 text-theme-light-primary dark:text-theme-dark-primary"
                        aria-labelledby={labelId}
                      />
                    </td>
                    <td className="p-2" id={labelId}>
                      {row.name}
                    </td>
                    <td className="p-2 text-right">
                      <Link
                        onClick={linkClickHandler}
                        href={`tel:${row.phone}`}
                        className={`${isItemSelected && 'text-theme-light-white'} text-theme-light-primary dark:text-theme-dark-primary hover:underline`}
                      >
                        {row.phone}
                      </Link>
                    </td>
                    <td className="p-2 text-right">
                      <Link
                        onClick={linkClickHandler}
                        target="_blank"
                        href={`mailto:${row.email}`}
                        className={`${isItemSelected && 'text-theme-light-white'}text-theme-light-primary dark:text-theme-dark-primary hover:underline`}
                      >
                        {row.email}
                      </Link>
                    </td>
                    <td className="p-2 text-right">{row.city}</td>
                    <td className="p-2 text-right">{row.address}</td>
                    <td className="p-2 text-right">{row.director}</td>
                    <td className="p-2 text-right">{row.eik}</td>
                    <td className="p-2 text-right">{row.vat}</td>
                  </tr>
                );
              })}
              {emptyRows > 0 && (
                <tr
                  style={{
                    height: 33 * emptyRows
                  }}
                >
                  <td colSpan={9} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <RowsPerPage
          data={filteredClients}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}
