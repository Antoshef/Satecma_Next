'use client';

import { Client } from '@/clients/utils/types';
import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@/components/textField/TextField';
import { SelectField } from '@/components/selectField/SelectField';
import { Company } from './types';

export interface ClientInvoiceDataProps {
  setReceiver: Dispatch<SetStateAction<Client>>;
  isFieldsDisabled: boolean;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  provider: Company | null;
  reason: string;
  setReason: (reason: string) => void;
}

const ClientInvoiceData: React.FC<ClientInvoiceDataProps> = ({
  isFieldsDisabled,
  paymentMethod,
  setPaymentMethod,
  provider,
  reason,
  setReason
}) => {
  const paymentMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <td colSpan={4} className="text-left">
      <div>
        Начин на плащане:
        <SelectField
          isFieldsDisabled={isFieldsDisabled}
          value={paymentMethod}
          values={['По Банка', 'В Брой']}
          onChange={paymentMethodHandler}
        />
      </div>
      {paymentMethod === 'По Банка' && (
        <div>
          Банкови реквизити: {provider?.bankName}
          <br />
          BIC: {provider?.swift}
          <br />
          IBAN: {provider?.iban}
          <br />
        </div>
      )}
      <div>
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
  );
};

export default ClientInvoiceData;
