import { formatCurrency, formatDate } from '@/lib/utils';
import { h } from 'vue';

const dateRangeFilterFn = (row, columnId, filterValue) => {
  const rowValue = row.getValue(columnId);
  let [startDate, endDate] = filterValue;

  console.log('startDate: ', startDate);
  console.log('endDate: ', endDate);

  startDate = new Date(startDate).setHours(0, 0, 0, 0);
  endDate = new Date(endDate).setHours(23, 59, 59, 1000) || new Date(startDate).setHours(23, 59, 59, 1000);

  console.log('startDate: ', startDate);
  console.log('endDate: ', endDate);
  console.log('---------');

  //if (typeof row !== 'number') return false;
  return rowValue >= startDate && rowValue <= endDate;
};

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
