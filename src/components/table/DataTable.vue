<script setup>
import { ref } from 'vue';
import DataTablePagination from '@/components/table/DataTablePagination.vue';
import DataTableToolbar from '@/components/table/DataTableToolbar.vue';
import {
  FlexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table';
import { valueUpdater } from '@/lib/utils';
import { ROWS_PER_PAGE } from '@/constants';
import { useTableStore } from '@/stores';
import { Loader } from 'lucide-vue-next';

const tableStore = useTableStore();
const props = defineProps({
  data: {
    type: Array,
    require: true
  },
  columns: {
    type: Array,
    require: true
  },
  title: String,
  options: {
    type: Object,
    default: () => ({}),
    validator: function(value) {
      return typeof value.columnFilter === 'string' && typeof value.columnFilterDate === 'string'
        && (Array.isArray(value.listForFilter) || typeof value.listForFilter === 'undefined');
    }
  }
});

const sorting = ref([]);
const columnFilters = ref([]);
const columnVisibility = ref({});
const rowSelection = ref({});
const globalFilter = ref('');

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columns,
  filterFns: {},
  enableGlobalFilter: true,
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: ROWS_PER_PAGE[0]
    }
  },
  autoResetPageSize: false,
  autoResetPageIndex: false,
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get globalFilter() {
      return globalFilter.value;
    }
  },
  globalFilterFn: (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);
    const filterFn = props.columns.find((col) => col.accessorKey === columnId)?.filterFn;

    if (filterFn) {
      return filterFn(row, columnId, filterValue);
    }
    return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
  },
  enableRowSelection: true,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilter),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues()
});

const updateGlobalFilter = (newFilter) => {
  globalFilter.value = newFilter;
};
const emit = defineEmits(['refresh']);

const refresh = () => {
  table.reset();
  globalFilter.value = '';
  emit('refresh');
};
</script>

<template>
  <div class="px-5 py-5 space-y-4">
    <div class="font-bold text-xl px-5 py-5">{{ title }}</div>
    <div class="flex flex-row gap-x-7">
      <DataTableToolbar
        :table="table"
        :globalSearchText="globalFilter"
        :options="options"
        @updateGlobalSearchText="updateGlobalFilter"
        @refresh="refresh"
      />
    </div>
    <div class="bg-white rounded-[10px] p-2 mt-5">
      <table>
        <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            :class="[
                header.column.columnDef.columnClass,
                {
                  'cursor-pointer select-none': header.column.getCanSort(),
                },
              ]"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            {{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] }}
          </th>
        </tr>
        </thead>
        <div v-if="tableStore.loadingTable" class="flex flex-row gap-5 pt-5">
          <div class="h-6 w-max mr-3"> Loading data ...</div>
          <Loader class="animate-spin h-6 w-6 mr-3 duration-700" />
        </div>
        <tbody v-if="!tableStore.loadingTable" class="divide-y divide-gray-200">
        <template v-if="table.getRowModel().rows?.length > 0">
          <tr v-for="row in table.getRowModel().rows" :key="row.transactionId">
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
              :class="cell.column.columnDef.columnClass"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="columns.length" class="h-24 text-center text-xl">No results</td>
        </tr>
        </tbody>
        <tfoot
          v-if="table.getRowModel().rows?.length > 0 && !tableStore.loadingTable">
        <tr
          v-for="footerGroup in table.getFooterGroups()"
          :key="footerGroup.id"
          class="w-full"
        >
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :class="[
                header.column.columnDef.columnClass,
                {
                  'cursor-pointer select-none': header.column.getCanSort(),
                },
              ]"
          >
            <FlexRender
              v-if="!header.isPlaceholder && header.column.columnDef.footer"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
        </tfoot>
      </table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

td {
  text-align: left;
  padding: 8px;
}

th {
  text-align: left;
  padding: 10px 8px;
  font-weight: 500;
}

td:nth-child(1),
th:nth-child(1) {
  padding-left: 20px;
  max-width: 240px;
}

tr:nth-child(1) {
  border-bottom: 1px solid #f2f3f4;

  color: var(--c-blue-dark);
}

tr:hover {
  background: #ececec;
  transition: 0.1s ease-in-out;
  cursor: pointer;
}

.hidden-column {
  display: none;
}

table, th, td {
  border: 1px solid #777777;
  border-collapse: collapse;
}
</style>
