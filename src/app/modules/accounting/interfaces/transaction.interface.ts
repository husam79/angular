export interface Transaction {
  id: number;
  date: string;
  value: number;
  description: string;
  created_by: string;
  currency_id: string;
  entries: [];
  conversion_factor: number;
}
