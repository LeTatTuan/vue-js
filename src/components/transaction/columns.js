import { dateRangeFilterFn, formatCurrency, formatDate } from '@/lib/utils';
import { h } from 'vue';

const columnsTransactions = [
  {
    accessorKey: 'transactionId',
    header: 'ID',
    enableSorting: true,
    columnClass: 'hidden-column',
    enableHiding: true
  },
  {
    accessorKey: 'originalTransactionId',
    header: 'Customer',
    enableSorting: true,
    enableGlobalFilter: true
  },
  {
    accessorKey: 'bundleId',
    header: 'Project',
    enableSorting: true,
    enableGlobalFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'storefront',
    header: 'Store',
    enableSorting: true,
    enableGlobalFilter: true
  },
  {
    accessorKey: 'productId',
    header: 'Product',
    enableSorting: true,
    enableGlobalFilter: true
  },
  {
    accessorKey: 'totalCost',
    header: 'Revenue',
    cell: (info) => {
      return formatCurrency(info.getValue());
    },
    enableSorting: true
  },
  {
    accessorKey: 'offerType',
    header: 'Free Trial',
    enableSorting: true,
    enableGlobalFilter: false,
    cell: (info) =>
      h('input', {
        type: 'checkbox',
        checked: info.getValue() === 1,
        disabled: true
      })
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date',
    cell: (info) => formatDate(new Date(info.getValue())),
    enableSorting: true,
    enableGlobalFilter: false,
    meta: { filterVariant: 'range' },
    filterFn: dateRangeFilterFn
  },
  {
    accessorKey: 'expiresDate',
    header: 'Expiration Date',
    cell: (info) => {
      if (info.getValue()) {
        return formatDate(new Date(info.getValue()));
      }
      return 'Unlimited time';
    },
    enableSorting: true,
    enableGlobalFilter: false
  },
  {
    accessorKey: 'type',
    header: 'Renewal'
  }
];

export default columnsTransactions;
