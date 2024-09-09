// pages/api/search-company.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { companyId, companyName } = req.body;

  if (!companyId && !companyName) {
    return res
      .status(400)
      .json({ error: "You must provide either companyId or companyName" });
  }

  // Construct the URL based on the frontend parameters
  const apiUrl = companyId
    ? `https://portal.registryagency.bg/CR/api/Deeds/${companyId}`
    : `https://portal.registryagency.bg/CR/api/Deeds/Summary?page=1&pageSize=25&name=${encodeURIComponent(
        companyName,
      )}`;

  try {
    // Fetch data from the external API using the parameters
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: "EPZEUSessionID=your-session-id; currentLang=bg", // Example cookie, if needed
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Error fetching company data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
