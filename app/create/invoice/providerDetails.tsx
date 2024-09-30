import { TextField } from '@/components/textField/TextField';
import { Company } from './types';

interface ProviderDetailsProps {
  company: Company | null;
  isFieldsDisabled?: boolean;
  setCompany: React.Dispatch<React.SetStateAction<Company | null>>;
}

const inputFields = [
  { name: 'name', label: 'Доставчик:', placeholder: 'Фирма' },
  { name: 'eik', label: 'ЕИК:', placeholder: 'ЕИК' },
  {
    name: 'vat',
    label: 'ДДС №:',
    placeholder: 'ДДС №',
    formatValue: (company: Company | null) =>
      company ? `BG${company.eik}` : ''
  },
  { name: 'city', label: 'Град:', placeholder: 'Град' },
  { name: 'address', label: 'Адрес:', placeholder: 'Адрес' },
  { name: 'director', label: 'МОЛ:', placeholder: 'МОЛ' },
  { name: 'phone', label: 'Телефон:', placeholder: 'Телефон' }
];

const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  company,
  isFieldsDisabled,
  setCompany
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prevCompany) =>
      prevCompany ? { ...prevCompany, [name]: value } : null
    );
  };

  return (
    <td colSpan={2} className="py-4">
      {inputFields.map((field) => (
        <div key={field.name} className="flex place-items-center mb-1">
          <span className="basis-1/3 text-left">{field.label}</span>
          <TextField
            name={field.name}
            type="text"
            className="min-w-1/3"
            placeholder={field.placeholder}
            value={
              field.formatValue
                ? field.formatValue(company)
                : company?.[field.name as keyof Company] || ''
            }
            isFieldsDisabled={company ? true : isFieldsDisabled}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </td>
  );
};

export default ProviderDetails;
