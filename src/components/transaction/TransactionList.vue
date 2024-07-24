<script setup>
import DataTable from '@/components/table/DataTable.vue';
import { onBeforeMount, ref } from 'vue';
import columnsTransactions from './columns';
import { useManageUserStore, useRevenueStore, useTableStore } from '@/stores';

const userStore = useManageUserStore();
const revenueStore = useRevenueStore();
const tableStore = useTableStore();
const transactions = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const totalResults = ref(0);
const projects = ref([]);
const projectsForFilter = ref([]);

onBeforeMount(() => {
  fetchProjects();
  revenueStore.fetchTransactions(transactions, totalPages, totalResults, currentPage);
});

const fetchProjects = async () => {
  await userStore.fetchProjects(projects).then(() => {
    projectsForFilter.value = projects.value.map((project) => {
      return {
        value: project.keys.bundle_id,
        label: project.name
      };
    });
  });
};

const refresh = async () => {
  tableStore.loadingTable = true;
  await revenueStore.fetchTransactions(transactions, totalPages, totalResults, currentPage).then(() => {
    tableStore.loadingTable = false;
  });
};
</script>

<template>
  <div v-bind="$attrs">
    <data-table
      :data="transactions"
      :columns="columnsTransactions"
      title="Recent Transactions"
      :options="{
        columnFilter: 'bundleId',
        columnFilterDate: 'purchaseDate',
        listForFilter: projectsForFilter
      }"
      @refresh="refresh"
    />
  </div>
</template>