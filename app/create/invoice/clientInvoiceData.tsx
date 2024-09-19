'use client';

import { Client } from '@/clients/utils/types';
import { InvoiceReceiver } from './types';
import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@/components/textField/TextField';
import { SelectField } from '@/components/selectField/SelectField';
import CompanySuggestions from './CompanySuggestions';

export interface ClientInvoiceDataProps {
  clients: Client[];
  receiver: InvoiceReceiver;
  setReceiver: Dispatch<SetStateAction<InvoiceReceiver>>;
  isFieldsDisabled: boolean;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  provider: {
    bankName: string;
    swift: string;
    iban: string;
  };
  reason: string;
  setReason: (reason: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientInvoiceData: React.FC<ClientInvoiceDataProps> = ({
  clients,
  receiver,
  setReceiver,
  isFieldsDisabled,
  paymentMethod,
  setPaymentMethod,
  provider,
  reason,
  setReason,
  onChange
}) => {
  const paymentMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <tr className="invoiceBox__companyData">
      <td colSpan={4}>
        <div className="mb-2">Получател:</div>
        <div className="mb-2">
          Име на фирма:{' '}
          <CompanySuggestions
            clients={clients}
            receiver={receiver}
            setReceiver={setReceiver}
            isFieldsDisabled={isFieldsDisabled}
          />
        </div>
        <div className="mb-2">
          Град:{' '}
          <TextField
            name="city"
            type="text"
            placeholder="Град"
            value={receiver.city}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          Адрес:{' '}
          <TextField
            name="address"
            type="text"
            placeholder="Адрес"
            value={receiver.address}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          ЕИК:{' '}
          <TextField
            name="EIK"
            type="text"
            placeholder="ЕИК"
            value={receiver.EIK}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          ДДС №:{' '}
          <TextField
            name="VAT"
            type="text"
            placeholder="ДДС №"
            value={receiver.VAT}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          МОЛ:{' '}
          <TextField
            name="director"
            type="text"
            placeholder="МОЛ"
            value={receiver.director}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          Е-Поща:{' '}
          <TextField
            name="email"
            type="text"
            placeholder="Е-Поща"
            value={receiver.email}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
      </td>
      <td colSpan={4}>
        <div className="mb-2">
          Начин на плащане:
          <SelectField
            isFieldsDisabled={isFieldsDisabled}
            value={paymentMethod}
            values={['По Банка', 'В Брой']}
            onChange={paymentMethodHandler}
          />
        </div>
        {paymentMethod === 'По Банка' && (
          <div className="mb-2">
            Банкови реквизити: {provider.bankName}
            <br />
            BIC: {provider.swift}
            <br />
            IBAN: {provider.iban}
            <br />
          </div>
        )}
        <div className="mb-2">
          Основание на сделка по ЗДДС:
          <TextField
            name="reason"
            type="text"
            placeholder="Основание на сделка по ЗДДС"
            value={reason}
            isFieldsDisabled={isFieldsDisabled}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </td>
    </tr>
  );
};

export default ClientInvoiceData;
