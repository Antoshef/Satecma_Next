import { useEffect, useState } from 'react';
import { Client } from './types';

interface Props {
  selected?: Client;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  onSubmit: (client: Client) => Promise<void>;
}

export const ClientEditor = ({
  editMode,
  selected,
  setEditMode,
  onSubmit
}: Props) => {
  const [client, setProduct] = useState<Client | undefined>(selected);

  const handleChange = (key: keyof Client, value: string) => {
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: value
        }
    );
  };

  const submitHandler = () => {
    if (client) {
      onSubmit(client);
    }
  };

  useEffect(() => {
    setProduct(selected);
  }, [selected]);

  return editMode ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-theme-light-background dark:bg-theme-dark-background">
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Име
        </label>
        <input
          name="name"
          placeholder="Име"
          type="text"
          value={client?.name}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Град
        </label>
        <input
          name="city"
          placeholder="Град"
          type="text"
          value={client?.city}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Адрес
        </label>
        <input
          name="address"
          placeholder="Адрес"
          type="text"
          value={client?.address}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          ЕИК
        </label>
        <p className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm">
          {client?.eik}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          ДДС №
        </label>
        <input
          name="vat"
          placeholder="ДДС №"
          type="text"
          value={client?.vat}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Директор
        </label>
        <input
          name="director"
          placeholder="Директор"
          type="text"
          value={client?.director}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Е-Поща
        </label>
        <input
          name="email"
          placeholder="Е-Поща"
          type="text"
          value={client?.email}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Телефон
        </label>
        <input
          name="phone"
          placeholder="Телефон"
          type="text"
          value={client?.phone}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div className="col-span-2 flex justify-end space-x-4">
        <button
          onClick={submitHandler}
          className="px-4 py-2 bg-theme-light-primary dark:bg-theme-dark-primary text-white rounded-md shadow-sm hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary"
        >
          Save
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="px-4 py-2 bg-theme-light-secondary dark:bg-theme-dark-secondary text-white rounded-md shadow-sm hover:bg-theme-light-tertiary dark:hover:bg-theme-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-secondary dark:focus:ring-theme-dark-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};
