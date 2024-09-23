import { Company } from './types';

interface ProviderDetailsProps {
  company: Company | null;
  setCompany: React.Dispatch<React.SetStateAction<Company | null>>;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  company,
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
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">Доставчик:</span>
        <span>
          <input
            type="text"
            name="name"
            value={company?.name || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">ЕИК:</span>
        <span>
          <input
            type="text"
            name="eik"
            value={company?.eik || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">ДДС №:</span>
        <span>
          <input
            type="text"
            name="vat"
            value={company ? `BG${company.eik}` : ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">Град:</span>
        <span>
          <input
            type="text"
            name="city"
            value={company?.city || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">Адрес:</span>
        <span>
          <input
            type="text"
            name="address"
            value={company?.address || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">МОЛ:</span>
        <span>
          <input
            type="text"
            name="director"
            value={company?.director || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
      <div className="flex place-items-center">
        <span className="basis-1/3 text-left">Телефон:</span>
        <span>
          <input
            type="text"
            name="phone"
            value={company?.phone || ''}
            onChange={handleInputChange}
            className="w-full p-1 border border-gray-300 rounded"
          />
        </span>
      </div>
    </td>
  );
};

export default ProviderDetails;
