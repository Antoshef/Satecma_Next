import { Company } from '@/create/invoice/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '../../../utils/db';

interface TypedNextApiRequest extends NextApiRequest {
  body: Company;
}

const tableName = 'companies';

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { user_id } = req.query;

  if (method === 'GET') {
    try {
      const results = await queryAsync<Company[]>(
        `SELECT * FROM ${tableName} WHERE user_id = ?`,
        [user_id]
      );
      if (results.length === 0) {
        return res.status(200).json(undefined);
      }

      return res.status(200).json(results[0]);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (method === 'POST') {
    try {
      const providerData: Company = req.body;

      // Check for missing required fields
      const requiredFields: (keyof Company)[] = [
        'name',
        'eik',
        'vat',
        'city',
        'address',
        'director',
        'phone',
        'iban',
        'swift',
        'bankName'
      ];
      const missingFields: (keyof Company)[] = [];

      requiredFields.forEach((field) => {
        if (!providerData[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      const insertQuery = `
        INSERT INTO ${tableName} (user_id, eik, name, vat, city, address, director, phone, iban, swift, bankName)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        user_id,
        providerData.eik,
        providerData.name,
        providerData.vat,
        providerData.city,
        providerData.address,
        providerData.director,
        providerData.phone,
        providerData.iban,
        providerData.swift,
        providerData.bankName
      ];

      // Execute the insert query
      await queryAsync(insertQuery, values);

      // Retrieve the inserted record by a unique identifier, like `user_id`
      const selectQuery = `SELECT * FROM ${tableName} WHERE user_id = ?`;
      const insertedCompany = await queryAsync<Company>(selectQuery, [user_id]);

      // Respond with the inserted record
      return res.status(201).json({
        message: 'Company created successfully',
        data: insertedCompany
      });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (method === 'PUT') {
    try {
      const providerData: Company = req.body;

      const requiredFields: (keyof Company)[] = [
        'name',
        'eik',
        'vat',
        'city',
        'address',
        'director',
        'phone',
        'iban',
        'swift',
        'bankName'
      ];
      const missingFields: (keyof Company)[] = [];

      requiredFields.forEach((field) => {
        if (!providerData[field]) missingFields.push(field);
      });

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Ensure the company belongs to the current user
      const checkCompanyQuery = `
        SELECT * FROM ${tableName} WHERE eik = ? AND user_id = ?;
      `;
      const existingCompany = await queryAsync<Company[]>(checkCompanyQuery, [
        providerData.eik,
        user_id
      ]);

      if (existingCompany.length === 0) {
        return res.status(403).json({ message: 'You do not own this company' });
      }

      const updateQuery = `
        UPDATE ${tableName}
        SET name = ?, vat = ?, city = ?, address = ?, director = ?, phone = ?, iban = ?, swift = ?, bankName = ?
        WHERE eik = ? AND user_id = ?
        RETURNING *;
      `;
      const values = [
        providerData.name,
        providerData.vat,
        providerData.city,
        providerData.address,
        providerData.director,
        providerData.phone,
        providerData.iban,
        providerData.swift,
        providerData.bankName,
        providerData.eik,
        user_id
      ];

      const result = await queryAsync<Company>(updateQuery, values);
      return res.status(200).json(result);
    } catch (error) {
      console.error('PUT error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
