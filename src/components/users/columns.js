import { dateRangeFilterFn, formatDate } from '@/lib/utils';
import { h } from 'vue';
import SelectList from '@/components/commons/SelectList.vue';
import { Button } from '@/components/ui/button';

const columnsTransactions = [
    {
        accessorKey: 'user',
        header: 'USER',
        cell: (info) => h('div', { class: 'flex flex-col' }, [
            h('p', {}, info.getValue().name),
            h('p', {}, info.getValue().email)
        ]),
        enableSorting: true,
    },
    {
        accessorKey: 'roles',
        header: 'ROLES',
        enableSorting: true,
        cell: (info) => {
            return h(SelectList,
                {
                    list: info.getValue(),
                    placeholder: 'Role',
                    isSelect: false
                }
            );
        }
        ,
    },
    {
        accessorKey: 'projects',
        header: 'PROJECTS',
        enableSorting: true,
        cell: (info) =>
            h(SelectList,
                {
                    list: info.getValue(),
                    placeholder: 'Project',
                    isSelect: false
                }
            )
        ,
    },
    {
        accessorKey: 'createdAt',
        header: 'JOIN DATE',
        enableSorting: true,
        cell: (info) => formatDate(new Date(info.getValue())).slice(0, 10),
        filterFn: dateRangeFilterFn,
    },
    {
        accessorKey: '_id',
        header: 'Actions',
        enableSorting: true,
        cell: (info) => {
            return h('div', {
                style: {
                    display: 'flex',
                    gap: '10px',
                }
            }, [
                h(Button, {
                    onClick: () => this.$emit('edit-uder', info.getValue()),
                    variant: 'secondary',
                }, 'Edit'),
                h(Button, {
                    onClick: () => this.$emit('delete-user', info.getValue()),
                    type: 'destructive',
                }, 'Delete')
            ]);
        },
    },
];

export default columnsTransactions;
