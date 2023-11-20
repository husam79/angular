import { Section } from '../interfaces/section.interface';
import { AppRoutes } from './routes';

export const SECTIONS: Section[] = [
  {
    name: 'accounting.title',
    svg: 'bank',
    children: [
      {
        name: 'accounting.transactions',
        svg: '',
        route: `${AppRoutes.Accounting}/${AppRoutes.Transactions}`,
        children: [],
      },
      {
        name: 'accounting.accounts-chart',
        svg: '',
        route: `${AppRoutes.Accounting}/${AppRoutes.AccountCharts}`,
        children: [],
      },
    ],
  },
  {
    name: 'inventory.title',
    svg: 'warehouse',
    children: [
      {
        name: 'inventory.products',
        svg: '',
        route: `${AppRoutes.Inventory}/${AppRoutes.Products}`,
        children: [],
      },
      {
        name: 'inventory.inventory-list',
        svg: '',
        route: `${AppRoutes.Inventory}/${AppRoutes.InventoriesList}`,
        children: [],
      },
      {
        name: 'inventory.purchase-invoices',
        svg: '',
        route: `${AppRoutes.Inventory}/${AppRoutes.PurchaseInvoices}`,
        children: [],
      },
      {
        name: 'inventory.sales-invoices',
        svg: '',
        route: `${AppRoutes.Inventory}/${AppRoutes.SalesInvoices}`,
        children: [],
      },
    ],
  },
];
