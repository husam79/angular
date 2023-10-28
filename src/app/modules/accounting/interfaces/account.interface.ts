export interface Account {
  name: string;
  no: string;
  balance: string;
  is_main: number;
  children: Account[];
}
