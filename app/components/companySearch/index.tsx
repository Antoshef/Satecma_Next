// components/CompanySearch.tsx
"use client";

import React, { useState } from "react";
import {
  fetchCompanyByNameOrId,
  CompanySummary,
} from "@/utils/companyRegistry";

const CompanySearch: React.FC = () => {
  const [companyId, setCompanyId] = useState<string>(""); // ID field
  const [companyName, setCompanyName] = useState<string>(""); // Name field
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CompanySummary[] | null>(null);

  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      // Determine whether to search by ID or name based on which field is filled
      const query = companyId ? companyId : companyName;
      const isIdSearch = companyId.length > 0;

      const data = await fetchCompanyByNameOrId(query, isIdSearch);
      setResults(data.results);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Disable the other field if one is filled
  const handleCompanyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(e.target.value);
    if (e.target.value) {
      setCompanyName(""); // Disable name input if ID is filled
    }
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    if (e.target.value) {
      setCompanyId(""); // Disable ID input if name is filled
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-4">
        Search Bulgarian Company Registry
      </h2>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 gap-4">
          {/* Company ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter Company ID
            </label>
            <input
              type="text"
              value={companyId}
              onChange={handleCompanyIdChange}
              disabled={companyName.length > 0} // Disable if name is filled
              placeholder="Enter company ID"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Company Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              disabled={companyId.length > 0} // Disable if ID is filled
              placeholder="Enter company name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center mt-5">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <div
          className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
          {results.map((company) => (
            <div
              key={company.ident}
              className="bg-white shadow-md rounded-lg p-4 mt-2"
            >
              <p className="text-sm font-medium text-gray-700">
                <strong>Company ID:</strong> {company.ident}
              </p>
              <p className="text-sm font-medium text-gray-700">
                <strong>Name:</strong> {company.name}
              </p>
              <p className="text-sm font-medium text-gray-700">
                <strong>Full Name:</strong> {company.companyFullName}
              </p>
            </div>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <div
          className="mt-5 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
          role="alert"
        >
          No results found for your query.
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
