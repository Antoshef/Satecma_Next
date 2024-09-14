import { useEffect, useState } from "react";
import { Client } from "./types";

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
  onSubmit,
}: Props) => {
  const [client, setProduct] = useState<Client | undefined>(selected);

  const handleChange = (key: keyof Client, value: string) => {
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: value,
        },
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Име</label>
        <input
          name="name"
          placeholder="Име"
          type="text"
          value={client?.name}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Град</label>
        <input
          name="city"
          placeholder="Град"
          type="text"
          value={client?.city}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Адрес</label>
        <input
          name="address"
          placeholder="Адрес"
          type="text"
          value={client?.address}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ЕИК</label>
        <p className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
          {client?.eik}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ДДС №</label>
        <input
          name="vat"
          placeholder="ДДС №"
          type="text"
          value={client?.vat}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-2 flex justify-end space-x-4">
        <button
          onClick={submitHandler}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};
