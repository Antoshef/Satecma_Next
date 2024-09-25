import { TextField } from '@/components/textField/TextField';
import { Company } from './types';

interface ProviderDetailsProps {
  company: Company | null;
  isFieldsDisabled?: boolean;
  setCompany: React.Dispatch<React.SetStateAction<Company | null>>;
}

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
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">Доставчик:</span>
        <TextField
          name="name"
          type="text"
          className="w-1/3"
          placeholder="Фирма"
          value={company?.city || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">ЕИК:</span>
        <TextField
          name="eik"
          type="text"
          className="w-1/3"
          placeholder="ЕИК"
          value={company?.eik || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">ДДС №:</span>
        <TextField
          name="vat"
          type="text"
          className="w-1/3"
          placeholder="ДДС №"
          value={company ? `BG${company.eik}` : ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">Град:</span>
        <TextField
          name="city"
          type="text"
          className="w-1/3"
          placeholder="Град"
          value={company?.city || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">Адрес:</span>
        <TextField
          name="address"
          type="text"
          className="w-1/3"
          placeholder="Адрес"
          value={company?.address || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">МОЛ:</span>
        <TextField
          name="director"
          type="text"
          className="w-1/3"
          placeholder="МОЛ"
          value={company?.director || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex place-items-center mb-1">
        <span className="basis-1/3 text-left">Телефон:</span>
        <TextField
          name="phone"
          type="text"
          className="w-1/3"
          placeholder="Телефон"
          value={company?.phone || ''}
          isFieldsDisabled={isFieldsDisabled}
          onChange={handleInputChange}
        />
      </div>
    </td>
  );
};

export default ProviderDetails;
