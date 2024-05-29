<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-if="activeUsers !== null">
        <CardItem
          v-for="revenue in revenues"
          :key="revenue.id"
          :title="revenue.title"
          :no_attribute="revenue.no_attribute"
          :time_description="revenue.time_description"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getActiveSubs, getActiveTrials, getActiveUsers, getNewCustomers, getRevenues } from '@/services';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import CardItem from './CardItem.vue';
const activeTrials = ref(null);
const activeSubs = ref(null);
const monthlyRecurringRevenue = ref(null);
const revenueData = ref(null);
const newCustomers = ref(null);
const activeUsers = ref(null);

const revenues = [
  {
    id: 1,
    title: 'Active Trials',
    no_attribute: null,
    time_description: 'Last 28 days',
  },
  {
    id: 2,
    title: 'Active Subcriptions',
    no_attribute: null,
    time_description: 'Last 28 days',
  },
  {
    id: 3,
    title: 'MRR',
    no_attribute: null,
    time_description: 'Monthly Recurring Revenue',
  },
  {
    id: 4,
    title: 'Revenue',
    no_attribute: null,
    time_description: 'Last 28 days',
  },
  {
    id: 5,
    title: 'New Customers',
    no_attribute: null,
    time_description: 'Last 28 days',
  },
  {
    id: 6,
    title: 'Active Users',
    no_attribute: null,
    time_description: 'Last 28 days',
  },
];

onBeforeMount(() => {
  fetchData();
  console.log('check: ', activeSubs);
  console.log('check: ', revenues);
});
const fetchData = async () => {
  try {
    await getActiveTrials().then((res) => {
      console.log('activeTrials: ', res);
      activeTrials.value = res['data']['metadata']['active_trials_formatted'];
      revenues[0].no_attribute = activeTrials.value;
    });
    await getActiveSubs().then((res) => {
      console.log('activeSubs: ', res);
      activeSubs.value = res['data']['metadata']['active_subs_formatted'];
      revenues[1].no_attribute = activeSubs.value;
    });
    await getRevenues().then((res) => {
      console.log('monthlyRecurringRevenue: ', res);
      monthlyRecurringRevenue.value = res['data']['metadata']['revenue_formatted'];
      revenueData.value = res['data']['metadata']['revenue_formatted'];
      revenues[2].no_attribute = monthlyRecurringRevenue.value;
      revenues[3].no_attribute = revenueData.value;
    });
    await getNewCustomers().then((res) => {
      console.log('newCustomers: ', res);
      newCustomers.value = res['data']['metadata']['new_customers_formatted'];
      revenues[4].no_attribute = newCustomers.value;
    });
    await getActiveUsers().then((res) => {
      console.log('activeUsers: ', res);
      activeUsers.value = res['data']['metadata']['active_users_formatted'];
      revenues[5].no_attribute = activeUsers.value;
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.row {
  display: flex;
}

.col {
  flex: 1;
}

.container {
  flex: content;
}
</style>
