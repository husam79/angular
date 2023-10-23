export interface Transaction {
  id: number;
  date: string;
  value: number;
  currency: string;
  value_eur: number;
  user: string;
  description: string;
}
