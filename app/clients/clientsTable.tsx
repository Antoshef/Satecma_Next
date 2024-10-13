'use client';

import { EnhancedTableToolbar } from '@/components/genericTable/enhancedTableToolbar';
import GenericTable from '@/components/genericTable/genericTable';
import { RowsPerPage } from '@/components/rowsPerPage';
import { EnhancedMode } from '@/products/utils/types';
import useToast from '@/products/utils/useToast';
import { getComparator } from '@/utils/getComparator';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { ClientEditor } from './utils/clientEditor';
import { headCells } from './utils/constants';
import { Client } from './utils/types';
import { useUser } from '@auth0/nextjs-auth0/client';

interface PageProps {
  data: Client[];
  error?: string;
}

export default function ClientsTable({ data, error }: PageProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Client>('name');
  const [selected, setSelected] = useState<Client[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState<EnhancedMode>(EnhancedMode.None);
  const { ToastContainer, notify } = useToast();
  const { user } = useUser();

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
      setSelected(filteredClients);
    } else {
      setSelected([]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    const _searchTerm = e.target.value.toLowerCase();
    setSearchTerm(_searchTerm);
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(_searchTerm)
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

  const onSubmit = async (client: Client) => {
    try {
      if (mode === EnhancedMode.Create) {
        // Send the POST request to create a new client
        const response = await fetch(`/api/clients?userId=${user?.sub}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(client)
        });

        if (!response.ok) {
          const data = await response.json();
          const errorMessage =
            data.message || 'An error occurred while creating the client';
          throw new Error(errorMessage + ` (Status ${response.status})`);
        }

        // Update the local state if the request was successful
        const newClient = await response.json();
        setFilteredClients((prevClients) => [...prevClients, newClient.client]);
        setMode(EnhancedMode.None);
        notify('The client was successfully created', 'success');
      } else if (mode === EnhancedMode.Edit) {
        // Make sure the client object has a client_uuid
        if (!client.client_uuid) {
          throw new Error('Missing client identifier');
        }

        // Send the PUT request with the client_uuid in the URL
        const response = await fetch(
          `/api/clients/${client.client_uuid}?userId=${user?.sub}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
          }
        );

        if (!response.ok) {
          const data = await response.json();
          const errorMessage =
            data.message || 'An error occurred while editing the client';
          throw new Error(errorMessage + ` (Status ${response.status})`);
        }

        // Update the local state if the request was successful
        const index = filteredClients.findIndex(
          (c) => c.client_uuid === client.client_uuid
        );
        if (index >= 0) {
          const newClients = [...filteredClients];
          newClients[index] = client;
          setFilteredClients(newClients);
        }
        setMode(EnhancedMode.None);
        notify('The client was successfully edited', 'success');
      }
    } catch (error) {
      console.error('Error submitting client:', error);
      notify('An error occurred while submitting the client', 'error');
    }
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

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredClients(clients);
    } else {
      setFilteredClients(
        clients.filter((client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, clients]);

  useEffect(() => {
    if (error) {
      notify(error, 'error');
    }
    if (data) {
      setClients(data);
      setFilteredClients(data);
    }
  }, [data, error, notify]);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="w-full rounded-b-xl bg-theme-light-background dark:bg-theme-dark-background shadow">
        <EnhancedTableToolbar
          title="Клиенти"
          isSelected={!!selected.length}
          selectedCount={selected.length}
          setMode={setMode}
        />
        <ClientEditor
          mode={mode}
          selected={selected[0]}
          onSubmit={onSubmit}
          setMode={setMode}
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
        <GenericTable<Client>
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={(event, client) =>
            setSelected((state) => {
              if (state.some((c) => c.eik === client.eik)) {
                return state.filter((c) => c.eik !== client.eik);
              } else {
                return [...state, client];
              }
            })
          }
          isSelected={(client) => isSelected(client.eik)}
          selected={selected}
          filteredItems={filteredClients}
          visibleRows={visibleRows}
          emptyRows={emptyRows}
        />
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
