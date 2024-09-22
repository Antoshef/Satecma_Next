import { SelectField } from '@/components/selectField/SelectField';
import { TextField } from '@/components/textField/TextField';
import Image from 'next/image';
import { SATECMA_LOGO } from './constants';
import { InvoiceType, InvoiceData } from './types';

interface InvoiceDetailsProps {
  invoiceType: InvoiceType;
  setInvoiceType: React.Dispatch<React.SetStateAction<InvoiceType>>;
  invoiceNumber: string;
  setInvoiceNumber: React.Dispatch<React.SetStateAction<string>>;
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  isFieldsDisabled: boolean;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoiceType,
  setInvoiceType,
  invoiceNumber,
  setInvoiceNumber,
  invoiceData,
  setInvoiceData,
  isFieldsDisabled
}) => {
  return (
    <td className="title">
      <Image src={SATECMA_LOGO} alt="Satecma logo" width={300} height={65} />
      <br />
      <span>Фактура </span>
      <SelectField
        isFieldsDisabled={isFieldsDisabled}
        value={invoiceType}
        values={[InvoiceType.original, InvoiceType.proforma]}
        displayValues={['Оригинал', 'Проформа']}
        className="mb-2"
        onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
      />
      <br />
      <span>
        Фактура №:{' '}
        <TextField
          name="invoiceNumber"
          type="text"
          placeholder="0000000001"
          value={invoiceNumber}
          isFieldsDisabled={isFieldsDisabled}
          maxLength={10}
          className="mb-2"
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        {invoiceNumber.length !== 10 && (
          <>
            <br />
            <span className="invoiceBox__error">
              Номера трябва да съдържа 10 символа
            </span>
          </>
        )}
      </span>
      <br />
      <span>
        Създадена:{' '}
        <TextField
          isFieldsDisabled={isFieldsDisabled}
          value={invoiceData.date}
          type="date"
          name="date"
          onChange={(e) =>
            setInvoiceData((state) => ({
              ...state,
              date: e.target.value
            }))
          }
        />
      </span>
    </td>
  );
};

export default InvoiceDetails;
