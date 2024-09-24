import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import Image from 'next/image';
import { SATECMA_LOGO } from './constants';
import { InvoiceType, InvoiceData } from './types';

interface InvoiceDetailsProps {
  error: {
    invoiceNumber: boolean;
    wordPrice: boolean;
  };
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
  return (
    <>
      <td colSpan={4}>
        <Image
          src={SATECMA_LOGO}
          alt="Satecma logo"
          width={220}
          height={65}
          style={{ width: 220, height: 'auto' }}
        />
      </td>
      <td colSpan={4} className="pl-4 text-right">
        <div>
          <span>Фактура </span>
          <SelectField
            isFieldsDisabled={isFieldsDisabled}
            value={invoiceType}
            values={[
              InvoiceType.none,
              InvoiceType.original,
              InvoiceType.proforma
            ]}
            displayValues={['Избери тип', 'Оригинал', 'Проформа']}
            className="mb-2 w-5/12"
            onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
          />
        </div>
        <div>
          <p>
            Фактура №:{' '}
            <TextField
              name="invoiceNumber"
              type="text"
              placeholder="0000000001"
              value={invoiceNumber}
              isFieldsDisabled={isFieldsDisabled}
              maxLength={10}
              className="mb-2 w-5/12"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            {error.invoiceNumber && (
              <p className="text-red-500 text-xs text-center">
                Номера трябва да съдържа 10 символа
              </p>
            )}
          </p>
        </div>
        <div>
          <span>
            Създадена:{' '}
            <TextField
              isFieldsDisabled={isFieldsDisabled}
              value={invoiceData.date}
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
