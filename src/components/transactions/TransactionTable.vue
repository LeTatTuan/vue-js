<script setup>
import { ref } from 'vue';
import DataTablePagination from '@/components/transactions/DataTablePagination.vue';

const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
  columns: {
    type: Array,
    require: true,
  },
});

import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table';

const data = ref(props.data);

console.log('check data: ', props.data);

const sorting = ref([]);
const filter = ref('');
const table = useVueTable({
  data: data.value,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
    get globalFilter() {
      return filter.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
  },
});
</script>

<template>
  <div class="px-5 py-5">
    <p class="font-bold text-xl">Recent Transactions</p>
    <div class="my-4">
      <input v-model="filter" type="text" class="border border-gray-400 rounded px-2 py-2" placeholder="Search" />
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
              {{ { asc: ' ↑', desc: '↓' }[header.column.getIsSorted()] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="table.getRowModel().rows?.length">
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
            <td :colspan="columns.length" class="h-24 text-center">No results</td>
          </tr>
        </tbody>
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
</style>
