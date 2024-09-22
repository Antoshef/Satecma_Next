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
    <td>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="max-w-[80px] p-0 text-right">Доставчик:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="name"
                value={company?.name || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">ЕИК:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="eik"
                value={company?.eik || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">ДДС №:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="vat"
                value={company ? `BG${company.eik}` : ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">Град:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="city"
                value={company?.city || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">Адрес:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="address"
                value={company?.address || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">МОЛ:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="director"
                value={company?.director || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="max-w-[80px] p-0 text-right">Телефон:</td>
            <td className="max-w-[120px] p-0">
              <input
                type="text"
                name="phone"
                value={company?.phone || ''}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  );
};

export default ProviderDetails;
