// utils/companyRegistry.ts
export interface CompanySummary {
  isPhysical: boolean;
  ident: string;
  name: string;
  companyFullName: string;
}

export interface SearchResponse {
  results: CompanySummary[];
}

export const fetchCompanyByNameOrId = async (
  query: string,
  isId: boolean,
): Promise<SearchResponse> => {
  const baseApiUrl = isId
    ? `https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&count=0&ident=${encodeURIComponent(query)}`
    : `https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&count=0&name=${encodeURIComponent(
        query,
      )}&selectedSearchFilter=1&includeHistory=false`;

  const proxyUrl = `https://cors-anywhere.herokuapp.com/`; // CORS Anywhere Proxy
  const endpoint = proxyUrl + baseApiUrl;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch company data");
  }

  const data: CompanySummary[] = await response.json();
  return { results: data };
};
