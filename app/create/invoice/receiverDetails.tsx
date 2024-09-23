import React, { useState } from 'react';
import { Client } from '@/clients/utils/types';
import { TextField } from '@/components/textField/TextField';
import { GenericInput } from '@/components/genericTable/genericInput';

interface ReceiverDetailsProps {
  clients: Client[];
  receiver: Client;
  setReceiver: React.Dispatch<React.SetStateAction<Client>>;
  isFieldsDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReceiverDetails: React.FC<ReceiverDetailsProps> = ({
  clients,
  receiver,
  setReceiver,
  isFieldsDisabled,
  onChange
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setReceiver(client);
  };

  return (
    <td colSpan={6} className="py-4 align-top text-right">
      <div className="mb-1">
        <span className="text-right">Получател:</span>
        <GenericInput
          data={clients}
          selectedItem={selectedClient}
          setSelectedItem={handleClientSelect}
          displayProperty="name"
        />
      </div>
      <div className="mb-1">
        <span className="text-right">Град:</span>
        <TextField
          name="city"
          type="text"
          placeholder="Град"
          value={receiver.city}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
      <div className="mb-1">
        <span className="text-right">Адрес:</span>
        <TextField
          name="address"
          type="text"
          placeholder="Адрес"
          value={receiver.address}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
      <div className="mb-1">
        <span className="text-right">ЕИК:</span>
        <TextField
          name="eik"
          type="text"
          placeholder="ЕИК"
          value={receiver.eik}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
      <div className="mb-1">
        <span className="text-right">ДДС №:</span>
        <TextField
          name="vat"
          type="text"
          placeholder="ДДС №"
          value={receiver.vat}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
      <div className="mb-1">
        <span className="text-right">МОЛ:</span>
        <TextField
          name="director"
          type="text"
          placeholder="МОЛ"
          value={receiver.director}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
      <div>
        <span className="text-right">Е-Поща:</span>
        <TextField
          name="email"
          type="text"
          placeholder="Е-Поща"
          value={receiver.email}
          isFieldsDisabled={isFieldsDisabled}
          onChange={onChange}
        />
      </div>
    </td>
  );
};

export default ReceiverDetails;
