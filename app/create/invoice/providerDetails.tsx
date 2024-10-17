import { TextField } from '@/components/textField/TextField';
import { Company } from './types';

interface ProviderDetailsProps {
  company: Company;
  isFieldsDisabled?: boolean;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
}

const inputFields: {
  name: keyof Company;
  label: string;
  placeholder: string;
  required?: boolean;
}[] = [
  { name: 'name', label: 'Доставчик:', placeholder: 'Фирма', required: true },
  { name: 'eik', label: 'ЕИК:', placeholder: 'ЕИК', required: true },
  {
    name: 'vat',
    label: 'ДДС №:',
    placeholder: 'ДДС №'
  },
  { name: 'city', label: 'Град:', placeholder: 'Град', required: true },
  { name: 'address', label: 'Адрес:', placeholder: 'Адрес', required: true },
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
    if (name === 'eik' && typeof value === 'string') {
      return;
    }
    setCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
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
            required={field.required}
            value={company[field.name as keyof Company] || ''}
            isFieldsDisabled={isFieldsDisabled}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </td>
  );
};

export default ProviderDetails;
