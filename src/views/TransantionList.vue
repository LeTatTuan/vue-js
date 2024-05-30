<script setup>
import { getRecentTransactions } from '@/services';
import { onBeforeMount, ref } from 'vue';

const transactions = ref([]);

onBeforeMount(() => {
  fetchTransactions();
});
const fetchTransactions = async () => {
  try {
    console.log('fetching transactions');
    await getRecentTransactions().then((res) => {
      transactions.value = res['data']['metadata'];
      console.log(transactions);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
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
          <th>Purchased</th>
          <th>Expiration</th>
          <th>Renewal</th>
        </tr>
        <tr v-for="transaction in transactions" :key="transaction.transactionId">
          <td class="font-medium">
            {{ transaction.originalTransactionId }}
          </td>
          <td>{{ transaction.bundleId }}</td>
          <td>{{ transaction.storefront }}</td>
          <td>{{ transaction.productId }}</td>
          <td>{{ transaction.totalCost }}</td>
          <td>{{ transaction.purchaseDate }}</td>
          <td>{{ transaction.expiresDate }}</td>
          <td class="text-right">
            {{ transaction.type }}
          </td>
        </tr>
      </table>
    </div>
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