import { Company } from "@/create/invoice/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../utils/db";

interface TypedNextApiRequest extends NextApiRequest {
  body: Company;
}

const tableName = "company";

async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      eik VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      vat VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      director VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      iban VARCHAR(255) NOT NULL,
      swift VARCHAR(255) NOT NULL,
      bankName VARCHAR(255) NOT NULL
    );
  `;
  await queryAsync(createTableQuery);
}

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await createTableIfNotExists();

  if (method === "GET") {
    try {
      const results = await queryAsync<Company[]>(`SELECT * FROM ${tableName}`);
      return res.status(200).json({ data: results || [] });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "POST") {
    try {
      const providerData: Company = req.body;

      // Validate required fields
      const requiredFields: (keyof Company)[] = [
        "name",
        "eik",
        "vat",
        "city",
        "address",
        "director",
        "phone",
        "iban",
        "swift",
        "bankName",
      ];
      const missingFields: (keyof Company)[] = [];

      requiredFields.forEach((field) => {
        if (!providerData[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      const insertQuery = `
        INSERT INTO ${tableName} (eik, name, vat, city, address, director, phone, iban, swift, bankName)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *;
      `;
      const values = [
        providerData.eik,
        providerData.name,
        providerData.vat,
        providerData.city,
        providerData.address,
        providerData.director,
        providerData.phone,
        providerData.iban,
        providerData.swift,
        providerData.bankName,
      ];

      const result = await queryAsync<Company>(insertQuery, values);
      return res.status(201).json({ data: result });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
