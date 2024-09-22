'use client';

import React, { useState, useEffect } from 'react';

interface GenericSearchProps<T> {
  data: T[];
  searchKey: keyof T;
  onSelect: (item: T) => void;
  placeholder?: string;
}

const GenericSearch = <T extends { [key: string]: any }>({
  data,
  searchKey,
  onSelect,
  placeholder
}: GenericSearchProps<T>) => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<T[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (query.length && isMenuOpen) {
      const suggestions = data.filter((item) =>
        item[searchKey].toString().toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(suggestions);
    } else {
      setFilteredResults([]);
      setIsMenuOpen(false);
    }
  }, [query, data, isMenuOpen, searchKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setIsMenuOpen(true);
  };

  const handleSuggestionClick = (item: T) => {
    onSelect(item);
    setQuery(item[searchKey].toString());
    setFilteredResults([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {isMenuOpen && filteredResults.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredResults.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {item[searchKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericSearch;
