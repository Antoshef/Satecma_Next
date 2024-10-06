import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Client } from '@/clients/utils/types';
import { TextField } from '@/components/textField/TextField';

interface CompanySuggestionsProps {
  clients: Client[];
  receiver: Client;
  setReceiver: Dispatch<SetStateAction<Client>>;
  isFieldsDisabled?: boolean;
}

const CompanySuggestions = ({
  clients,
  receiver,
  setReceiver,
  isFieldsDisabled
}: CompanySuggestionsProps) => {
  const [query, setQuery] = useState(receiver.name);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (query.length && isMenuOpen) {
      const suggestions = clients.filter((client) =>
        client.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClients(suggestions);
    } else {
      setFilteredClients([]);
      setIsMenuOpen(false);
    }
  }, [query, clients, isMenuOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setIsMenuOpen(true);
  };

  const handleSuggestionClick = (client: Client) => {
    setReceiver({
      user_id: receiver.user_id, // Ensure to include the user_id
      name: client.name,
      city: client.city,
      address: client.address,
      eik: client.eik,
      vat: client.vat,
      director: client.director,
      email: client.email
    });
    setQuery(client.name);
    setFilteredClients([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline">
      <TextField
        name="name"
        type="text"
        placeholder="Име на фирма"
        value={query}
        isFieldsDisabled={isFieldsDisabled}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {isMenuOpen && filteredClients.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredClients.map((client) => (
            <li
              key={client.eik}
              onClick={() => handleSuggestionClick(client)}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {client.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySuggestions;
