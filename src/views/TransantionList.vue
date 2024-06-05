  <!--<template>
  <div class="px-5 py-5">
    <p class="font-bold text-xl">Recent Transactions</p>
    <div class="bg-white rounded-[10px] p-2 mt-5">
      <table>
        <tr>
          <th>Customer</th>
          <th>Project</th>
          <th>Store</th>
          <th>Product</th>
          <th>Revenue</th>
          <th>Free Trial</th>
          <th>Purchased</th>
          <th>Expiration</th>
          <th>Renewal</th>
        </tr>
        <tr
          v-for="transaction in transactions"
          :key="transaction.transactionId"
        >
          <td class="font-medium">
            {{ transaction.originalTransactionId }}
          </td>
          <td>{{ transaction.bundleId }}</td>
          <td>{{ transaction.storefront }}</td>
          <td>{{ transaction.productId }}</td>
          <td>{{ transaction.totalCostStr }}</td>
          <td class="text-center">
            <input
              type="checkbox"
              :checked="transaction.offerType === 1"
              disabled
            />
          </td>
          <td>{{ transaction.purchaseDate }}</td>
          <td>{{ transaction.expiresDate }}</td>
          <td class="text-right">
            {{ transaction.type }}
          </td>
        </tr>
      </table>
    </div>
  </div>

  <vuePaginationVue :meta="meta" @change-page="handlePageChange" />
</template> -->
<template>
  <transaction-table
    :data="transactions.value"
    :columns="columnsTransactions"
  />
</template>
<script setup>
import vuePaginationVue from '@/components/commons/vuePagination.vue';
import TransactionTable from '@/components/transactions/TransactionTable.vue';
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
    console.log('fetching transactions');
    await getRecentTransactions(currentPage.value).then((res) => {
      transactions.value = res['data']['metadata']['data'];
      totalPages.value = res['data']['metadata']['totalPages'];
      totalResults.value = res['data']['metadata']['totalResults'];
      currentPage.value = res['data']['metadata']['page'];
      meta.value = {
        current_page: currentPage.value,
        total_pages: totalPages.value,
        prev_page:
          currentPage.value == 1 ? currentPage.value : currentPage.value - 1,
        next_page:
          currentPage.value == totalPages.value
            ? totalPages.value
            : currentPage.value + 1,
      };
      console.log(meta.value);
    });
  } catch (error) {
    console.log(error);
  }
};

const handlePageChange = (page) => {
  console.log('current page from child: ', page);
  currentPage.value = page;
  console.log('current page from parent: ', currentPage.value);
  fetchTransactions();
};
</script>

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
