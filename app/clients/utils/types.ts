export interface Client {
  id?: number; // Optional, will be auto-assigned
  user_id: number; // The ID of the user who owns this client
  name: string;
  city: string;
  address: string;
  eik: string;
  vat: string;
  director: string;
  email: string;
  phone?: string;
}