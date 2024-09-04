// pages/api/user.ts
import { Company } from "@/create/invoice/constants";
import { Provider } from "@/create/invoice/types";
import type { NextApiRequest, NextApiResponse } from "next";

const providerData: Provider = {
  name: Company.satecma,
  eik: 123456789,
  VAT: "BG123456789",
  city: "City Name",
  address: "Street Address",
  director: "Director Name",
  phone: "+1234567890",
  bankDetails: {
    iban: "BG00XXXX00000000000000",
    swift: "XXXXBGSF",
    name: "Bank Name",
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Provider>,
) {
  res.status(200).json(providerData);
}
