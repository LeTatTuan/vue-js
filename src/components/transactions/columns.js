import { formatCurrency, formatDate } from '@/lib/utils';
import { h } from 'vue';

const columnsTransactions = [
  {
    accessorKey: 'transactionId',
    header: 'ID',
    enableSorting: true,
    columnClass: 'hidden-column',
  },
  {
    accessorKey: 'originalTransactionId',
    header: 'Customer',
    enableSorting: true,
  },
  {
    accessorKey: 'bundleId',
    header: 'Project',
    enableSorting: true,
  },
  {
    accessorKey: 'storefront',
    header: 'Store',
    enableSorting: true,
  },
  {
    accessorKey: 'productId',
    header: 'Product',
    enableSorting: true,
  },
  {
    accessorKey: 'totalCost',
    header: 'Revenue',
    cell: (info) => {
      return formatCurrency(info.getValue());
    },
    enableSorting: true,
  },
  {
    accessorKey: 'offerType',
    header: 'Free Trial',
    enableSorting: false,
    cell: (info) =>
      h('input', {
        type: 'checkbox',
        checked: info.getValue() === 1,
        disabled: true,
      }),
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchased',
    cell: (info) => formatDate(new Date(info.getValue())),
    enableSorting: true,
  },
  {
    accessorKey: 'expiresDate',
    header: 'Expiration',
    cell: (info) => {
      if (info.getValue()) {
        return formatDate(new Date(info.getValue()));
      }
      return 'Unlimited time';
    },
    enableSorting: true,
  },
  {
    accessorKey: 'type',
    header: 'Renewal',
    enableSorting: false,
  },
];

export default columnsTransactions;
