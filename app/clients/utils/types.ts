export interface Client {
  id?: number; // Optional, will be auto-assigned
  client_uuid?: string; // The UUID of the client
  user_id: string;
  name: string;
  city: string;
  address: string;
  eik: string;
  vat: string;
  director: string;
  email: string;
  phone?: string;
}
