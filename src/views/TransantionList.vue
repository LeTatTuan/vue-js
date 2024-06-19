<script setup>
import DataTable from '@/components/transactions/DataTable.vue';
import { getRecentTransactions } from '@/services';
import { onBeforeMount, ref } from 'vue';
import columnsTransactions from '@/components/transactions/columns';

const transactions = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const totalResults = ref(0);
const meta = ref({
  current_page: null,
  total_pages: null,
  prev_page: null,
  next_page: null,
});

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
    meta.value = {
      current_page: currentPage.value,
      total_pages: totalPages.value,
      prev_page: currentPage.value == 1 ? currentPage.value : currentPage.value - 1,
      next_page: currentPage.value == totalPages.value ? totalPages.value : currentPage.value + 1,
    };
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-bind="$attrs">
    <data-table v-if="transactions.length > 0" :data="transactions" :columns="columnsTransactions" />
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
</style>
