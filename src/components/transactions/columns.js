import { formatCurrency, formatDate } from '@/lib/utils';

const columnsTransactions = [
    {
        accessorKey: 'transactionId',
        header: 'ID',
        enableSorting: true,
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
        cell: info => formatCurrency(info.getValue()),
        enableSorting: true,
    },
    {
        accessorKey: 'offerType',
        header: 'Free Trial',
        enableSorting: false,
    },
    {
        accessorKey: 'purchaseDate',
        header: 'Purchased',
        cell: info => formatDate(new Date(info.getValue())),
        enableSorting: true,
    },
    {
        accessorKey: 'expiresDate',
        header: 'Expiration',
        cell: info => formatDate(new Date(info.getValue())),
        enableSorting: true,
    },
    {
        accessorKey: 'type',
        header: 'Renewal',
        enableSorting: false,
    },
];

export default columnsTransactions;