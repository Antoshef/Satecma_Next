import { NextApiRequest, NextApiResponse } from "next";
import { queryAsync } from "../../../utils/db";
import { Client } from "@/clients/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  if (method === "GET") {
    try {
      const results = await queryAsync<Client[]>(`SELECT * FROM clients`);
      if (!results) {
        return res.status(404).json({ message: "Clients not found" });
      }
      return res.status(200).json({ data: results });
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  if (method === "POST") {
    try {
      const { name, city, address, eik, vat, director, email, phone } =
        req.body as Client;
      if (
        !name ||
        !city ||
        !address ||
        !eik ||
        !vat ||
        !director ||
        !email ||
        !phone
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const results = await queryAsync(
        `
        INSERT INTO clients (name, city, address, eik, vat, director, email, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [name, city, address, eik, vat, director, email, phone],
      );
      if (!results) {
        return res.status(500).json({ message: "Client not created" });
      }
      return res.status(200).json({ message: "Client created" });
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
