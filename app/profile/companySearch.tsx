"use client";

import { useState } from "react";

function CompanySearch() {
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/search-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId: companyId || undefined,
        companyName: companyName || undefined,
      }),
    });

    const data = await response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company ID:
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          disabled={!!companyName} // Disable when companyName is entered
        />
      </label>
      <br />
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={!!companyId} // Disable when companyId is entered
        />
      </label>
      <br />
      <button type="submit">Search Company</button>
    </form>
  );
}

export default CompanySearch;
