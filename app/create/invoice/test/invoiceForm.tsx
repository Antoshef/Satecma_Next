'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Company, InvoiceType, InvoiceData } from '../types';
import { Client } from '@/clients/utils/types';
import { Product } from '@/products/utils/types';
import InvoiceClientData from './invoiceClientData';
import InvoiceDataForm from './invoiceDataForm';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface InvoiceFormProps {
  provider: Company | null;
  clients: Client[];
  products: Product[];
  invoiceIds: string[];
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  provider,
  clients,
  products,
  invoiceIds
}) => {
  const [receiver, setReceiver] = useState<Client>({
    name: '',
    city: '',
    address: '',
    eik: '',
    vat: '',
    director: '',
    email: '',
    phone: ''
  });
  const [activeTab, setActiveTab] = useState<InvoiceType>(InvoiceType.original);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    client: '',
    eik: 0,
    vat_number: '',
    date: getTodayDate(),
    invoice_id: '',
    amount: 0,
    vat: 0,
    total: 0,
    type: InvoiceType.original
  });

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceiver((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTabChange = (type: InvoiceType) => {
    setActiveTab(type);
    setInvoiceData((prevData) => ({
      ...prevData,
      type
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Нова фактура</h2>
        <Image
          src="/path/to/logo.png"
          alt="Лого на компанията"
          width={50}
          height={50}
        />
      </div>
      <div className="mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 ${activeTab === InvoiceType.original ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500'}`}
            onClick={() => handleTabChange(InvoiceType.original)}
          >
            Оригинал
          </button>
          <button
            className={`py-2 px-4 ${activeTab === InvoiceType.proforma ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500'}`}
            onClick={() => handleTabChange(InvoiceType.proforma)}
          >
            Проформа
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InvoiceClientData
            clients={clients}
            receiver={receiver}
            setReceiver={setReceiver}
            handleClientChange={handleClientChange}
          />
          <InvoiceDataForm
            invoiceData={invoiceData}
            handleInvoiceChange={handleInvoiceChange}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Създай фактура
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
