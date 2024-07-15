import { dateRangeFilterFn, formatDate, objectFilterFn } from '@/lib/utils';
import { h } from 'vue';
import SelectList from '@/components/commons/SelectList.vue';
import ActionCell from '@/components/commons/ActionCell.vue';

const getColumnsUser = (showUpdateUser, showDeleteUser) => {
    return [
        {
            accessorKey: 'user',
            header: 'USER',
            enableSorting: true,
            enableGlobalFilter: true,
            cell: (info) => h('div', { class: 'flex flex-col' }, [
                h('p', {}, info.getValue().name),
                h('p', {}, info.getValue().email)
            ]),
            filterFn: objectFilterFn,
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
            cell: (info) => {
                if (!Array.isArray(info.getValue()) || !info.getValue()[0])
                    return 'No projects';
                return h(SelectList,
                    {
                        list: info.getValue(),
                        placeholder: 'Project',
                        isSelect: false
                    }
                );
            }
            ,
        },
        {
            accessorKey: 'createdAt',
            header: 'JOIN DATE',
            enableSorting: true,
            enableGlobalFilter: false,
            cell: (info) => formatDate(new Date(info.getValue())).slice(0, 10),
            filterFn: dateRangeFilterFn,
        },
        {
            accessorKey: '_id',
            header: 'ACTIONS',
            cell: (info) => {
                return h(ActionCell,
                    {
                        value: info.getValue(),
                        onUpdate: showUpdateUser,
                        onDelete: showDeleteUser,
                    }
                );
            },
            enableGlobalFilter: false,
        },
    ];
};
export default getColumnsUser;
