export interface Section {
  name: string;
  svg: string;
  route?: string;
  children: Section[];
}
