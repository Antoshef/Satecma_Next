// app/components/InvoiceDataForm.tsx
'use client';

import React from 'react';

interface InvoiceDataFormProps {
  invoiceData: {
    date: string;
    invoice_id: string;
    amount: number;
    vat: number;
    total: number;
  };
  handleInvoiceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceDataForm: React.FC<InvoiceDataFormProps> = ({
  invoiceData,
  handleInvoiceChange
}) => {
  console.log(invoiceData.date, 'invoiceData');
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Данни за фактурата</h3>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <input
            type="date"
            name="date"
            value={invoiceData.date}
            onChange={handleInvoiceChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Номер на фактура"
            name="invoice_id"
            value={invoiceData.invoice_id}
            onChange={handleInvoiceChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDataForm;
