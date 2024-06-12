import { formatCurrency, formatDate } from '@/lib/utils';
import { h } from 'vue';

const dateRangeFilterFn = (row, columnId, filterValue) => {
  const rowValue = new Date(row.getValue(columnId));
  console.log(rowValue);
  const [startDate, endDate] = filterValue;

  if (!rowValue) return false;

  return rowValue >= startDate && rowValue <= endDate;
};

const columnsTransactions = [
  {
    accessorKey: 'transactionId',
    header: 'ID',
    enableSorting: true,
    columnClass: 'hidden-column',
    size: 100
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    meta: { filterVariant: 'range' },
    filterFn: dateRangeFilterFn,
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
    meta: { filterVariant: 'range' },
    filterFn: dateRangeFilterFn,
  },
  {
    accessorKey: 'type',
    header: 'Renewal',
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

export default columnsTransactions;
