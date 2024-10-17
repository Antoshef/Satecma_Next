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

  const fields = [
    {
      label: 'Град:',
      name: 'city',
      placeholder: 'Град',
      value: receiver.city,
      required: true
    },
    {
      label: 'Адрес:',
      name: 'address',
      placeholder: 'Адрес',
      value: receiver.address,
      required: true
    },
    {
      label: 'ЕИК:',
      name: 'eik',
      placeholder: 'ЕИК',
      value: receiver.eik,
      required: true
    },
    { label: 'ДДС №:', name: 'vat', placeholder: 'ДДС №', value: receiver.vat },
    {
      label: 'МОЛ:',
      name: 'director',
      placeholder: 'МОЛ',
      value: receiver.director
    },
    {
      label: 'Е-Поща:',
      name: 'email',
      placeholder: 'Е-Поща',
      value: receiver.email
    }
  ];

  return (
    <td colSpan={6} className="py-4 align-top text-right">
      <div className="mb-1">
        <span className="text-right">Получател:</span>
        {isFieldsDisabled ? (
          <span>{selectedClient?.name}</span>
        ) : (
          <GenericInput
            data={clients}
            hint="Започни да пишеш за показване на списък с клиенти"
            className="w-1/3"
            variant="simple"
            required
            placeholder="Избери получател"
            selectedItem={selectedClient}
            setSelectedItem={handleClientSelect}
            displayProperty="name"
          />
        )}
      </div>
      {fields.map((field) => (
        <div key={field.name} className="mb-1">
          <span className="text-right">{field.label}</span>
          <TextField
            name={field.name}
            required={field.required}
            type="text"
            className="w-1/3"
            placeholder={field.placeholder}
            value={field.value}
            isFieldsDisabled={isFieldsDisabled}
            onChange={onChange}
          />
        </div>
      ))}
    </td>
  );
};

export default ReceiverDetails;
