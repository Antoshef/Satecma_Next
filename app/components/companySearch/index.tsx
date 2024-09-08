// components/CompanySearch.tsx
"use client";

import React, { useState } from "react";
import {
  fetchCompanyByNameOrId,
  CompanySummary,
} from "@/utils/companyRegistry";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

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
    <Paper elevation={3} className="p-6 max-w-lg mx-auto mt-5">
      <Typography variant="h6" gutterBottom>
        Search Bulgarian Company Registry
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          {/* Company ID Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Company ID"
              value={companyId}
              onChange={handleCompanyIdChange}
              disabled={companyName.length > 0} // Disable if name is filled
              placeholder="Enter company ID"
            />
          </Grid>

          {/* Company Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter Company Name"
              value={companyName}
              onChange={handleCompanyNameChange}
              disabled={companyId.length > 0} // Disable if ID is filled
              placeholder="Enter company name"
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading && (
        <div className="flex justify-center items-center mt-5">
          <CircularProgress />
        </div>
      )}

      {error && (
        <Alert severity="error" className="mt-5">
          {error}
        </Alert>
      )}

      {results && results.length > 0 && (
        <div className="mt-5">
          <Typography variant="h6">Search Results:</Typography>
          {results.map((company) => (
            <Paper key={company.ident} elevation={2} className="p-4 mt-2">
              <Typography variant="body1">
                <strong>Company ID:</strong> {company.ident}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {company.name}
              </Typography>
              <Typography variant="body1">
                <strong>Full Name:</strong> {company.companyFullName}
              </Typography>
            </Paper>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <Alert severity="info" className="mt-5">
          No results found for your query.
        </Alert>
      )}
    </Paper>
  );
};

export default CompanySearch;
