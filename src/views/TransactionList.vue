<script setup>
import DataTable from '@/components/transactions/DataTable.vue';
import { getRecentTransactions } from '@/services';
import { onBeforeMount, ref } from 'vue';
import columnsTransactions from '@/components/transactions/columns';

const transactions = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const totalResults = ref(0);

onBeforeMount(() => {
  fetchTransactions();
});
const fetchTransactions = async () => {
  try {
    const res = await getRecentTransactions();
    transactions.value = res['data']['metadata']['data'];
    totalPages.value = res['data']['metadata']['totalPages'];
    totalResults.value = res['data']['metadata']['totalResults'];
    currentPage.value = res['data']['metadata']['page'];
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-bind="$attrs">
    <data-table
      v-if="transactions.length > 0"
      :data="transactions"
      :columns="columnsTransactions"
      title="Recent Transactions"
      :options="{
        columnFilter: 'bundleId',
        columnFilterDate: 'purchaseDate',
      }"
    />
  </div>
</template>