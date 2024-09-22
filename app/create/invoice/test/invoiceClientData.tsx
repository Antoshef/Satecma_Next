'use client';

import React from 'react';
import { Client } from '@/clients/utils/types';
import { GenericInput } from '@/components/genericTable/genericInput';

interface InvoiceClientDataProps {
  clients: Client[];
  receiver: Client;
  setReceiver: React.Dispatch<React.SetStateAction<Client>>;
  handleClientChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceClientData: React.FC<InvoiceClientDataProps> = ({
  clients,
  receiver,
  setReceiver,
  handleClientChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Данни за клиента</h3>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <GenericInput
            required={true}
            data={clients}
            selectedItem={receiver}
            setSelectedItem={setReceiver}
            displayProperty="name"
            placeholder="Име на фирма"
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            value={receiver.city}
            onChange={handleClientChange}
            placeholder="Град"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            value={receiver.address}
            onChange={handleClientChange}
            placeholder="Адрес"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="eik"
            value={receiver.eik}
            onChange={handleClientChange}
            placeholder="ЕИК"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="vat"
            value={receiver.vat}
            onChange={handleClientChange}
            placeholder="ДДС номер"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="director"
            value={receiver.director}
            onChange={handleClientChange}
            placeholder="Директор"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={receiver.email}
            onChange={handleClientChange}
            placeholder="Имейл"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            value={receiver.phone}
            onChange={handleClientChange}
            placeholder="Телефон"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceClientData;
