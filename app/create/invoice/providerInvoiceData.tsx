'use client';

import { Client } from '@/clients/utils/types';
import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@/components/textField/TextField';
import { SelectField } from '@/components/selectField/SelectField';
import { Company } from './types';

export interface ProviderInvoiceDataProps {
  setReceiver: Dispatch<SetStateAction<Client>>;
  isFieldsDisabled: boolean;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  provider: Company | null;
  reason: string;
  setReason: (reason: string) => void;
  setCompany: Dispatch<SetStateAction<Company>>;
}

const ProviderInvoiceData: React.FC<ProviderInvoiceDataProps> = ({
  isFieldsDisabled,
  paymentMethod,
  setPaymentMethod,
  setCompany,
  provider,
  reason,
  setReason
}) => {
  const paymentMethodHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <td colSpan={4}>
      <div className="flex place-items-center mb-1 mt-4">
        <span className="basis-1/3 text-left">Начин на плащане:</span>
        <span>
          <SelectField
            isFieldsDisabled={isFieldsDisabled}
            value={paymentMethod}
            values={['По Банка', 'В Брой']}
            onChange={paymentMethodHandler}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      {paymentMethod === 'По Банка' && (
        <>
          <div className="flex place-items-center mb-1">
            <span className="basis-1/3 text-left">Банкови реквизити:</span>
            <TextField
              name="bankName"
              type="text"
              placeholder="Банка"
              value={provider?.bankName || ''}
              isFieldsDisabled={isFieldsDisabled}
              className="p-1 border border-gray-300 rounded"
              onChange={(e) =>
                setCompany((prevCompany) => ({
                  ...prevCompany,
                  bankName: e.target.value
                }))
              }
            />
          </div>
          <div className="flex place-items-center mb-1">
            <span className="basis-1/3 text-left">SWIFT:</span>
            <TextField
              name="swift"
              type="text"
              placeholder="Swift"
              value={provider?.swift || ''}
              isFieldsDisabled={isFieldsDisabled}
              className="p-1 border border-gray-300 rounded"
              onChange={(e) =>
                setCompany((prevCompany) => ({
                  ...prevCompany,
                  swift: e.target.value
                }))
              }
            />
          </div>
          <div className="flex place-items-center mb-1">
            <span className="basis-1/3 text-left">IBAN:</span>
            <TextField
              name="iban"
              type="text"
              placeholder="IBAN"
              value={provider?.iban || ''}
              isFieldsDisabled={isFieldsDisabled}
              className="p-1 border border-gray-300 rounded"
              onChange={(e) =>
                setCompany((prevCompany) => ({
                  ...prevCompany,
                  iban: e.target.value
                }))
              }
            />
          </div>
        </>
      )}
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">
          Основание на сделка по ЗДДС:
        </span>
        <span>
          <TextField
            name="reason"
            type="text"
            placeholder="Основание на сделка по ЗДДС"
            value={reason}
            isFieldsDisabled={isFieldsDisabled}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
    </td>
  );
};

export default ProviderInvoiceData;
