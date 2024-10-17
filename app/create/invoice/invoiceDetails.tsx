import React from 'react';
import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import Image from 'next/image';
import { InvoiceType, InvoiceData, InvoiceError } from './types';
import { useLogo } from '@/context/logoContext';

interface InvoiceDetailsProps {
  error: InvoiceError;
  invoiceType: InvoiceType;
  setInvoiceType: React.Dispatch<React.SetStateAction<InvoiceType>>;
  invoiceNumber: string;
  setInvoiceNumber: React.Dispatch<React.SetStateAction<string>>;
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  isFieldsDisabled: boolean;
}

const InvoiceHeader: React.FC<InvoiceDetailsProps> = ({
  invoiceType,
  setInvoiceType,
  invoiceNumber,
  setInvoiceNumber,
  invoiceData,
  setInvoiceData,
  isFieldsDisabled,
  error
}) => {
  const { logoUrl } = useLogo();
  return (
    <>
      <td colSpan={4}>
        {logoUrl && (
          <Image src={logoUrl} alt="Satecma logo" width={220} height={47} />
        )}
      </td>
      <td colSpan={4} className="pl-4 text-right">
        <div>
          <span>Фактура </span>
          <SelectField
            isFieldsDisabled={isFieldsDisabled}
            value={invoiceType}
            required
            values={[
              InvoiceType.none,
              InvoiceType.original,
              InvoiceType.proforma
            ]}
            displayValues={['--избери тип--', 'Оригинал', 'Проформа']}
            className="w-5/12"
            onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
          />
          {error.invoiceType && (
            <p className="text-red-500 text-xs text-right">
              Избери тип на фактурата
            </p>
          )}
        </div>
        <div className="mt-1">
          <p>
            Фактура №:{' '}
            <TextField
              name="invoiceNumber"
              required
              type="text"
              placeholder="0000000001"
              value={invoiceNumber}
              isFieldsDisabled={isFieldsDisabled}
              maxLength={10}
              className="w-5/12"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            {error.invoiceNumber && (
              <p className="text-red-500 text-xs text-right">
                Номера трябва да съдържа 10 символа
              </p>
            )}
          </p>
        </div>
        <div className="mt-1">
          <span>
            Създадена:{' '}
            <TextField
              isFieldsDisabled={isFieldsDisabled}
              value={invoiceData.date}
              required
              type="date"
              name="date"
              className="w-5/12"
              onChange={(e) =>
                setInvoiceData((state) => ({
                  ...state,
                  date: e.target.value
                }))
              }
            />
          </span>
        </div>
      </td>
    </>
  );
};

export default InvoiceHeader;
