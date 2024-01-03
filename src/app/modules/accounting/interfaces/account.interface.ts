export interface Account {
  id:number;
  name: string;
  no: string;
  balance: string;
  is_main: number;
  children?: Account[];
  currency_id?: string;
  display?: boolean;
}
