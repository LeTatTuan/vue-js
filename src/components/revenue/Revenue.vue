<template>
  <div class="space-y-4 px-5">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-if="activeUsers !== null">
        <card-item
          v-for="revenue in revenues"
          :key="revenue.id"
          :title="revenue.title"
          :no_attribute="revenue.no_attribute"
          :time_description="revenue.time_description"
          :icon="revenue.icon"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  getActiveSubs,
  getActiveTrials,
  getActiveUsers,
  getNewCustomers,
  getRevenues,
} from '@/services';
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import CardItem from './CardItem.vue';
import {
  DollarSign,
  Activity,
  UserRoundPlus,
  UserRoundCheck,
} from 'lucide-vue-next';

const activeTrials = ref('');
const activeSubs = ref('');
const monthlyRecurringRevenue = ref('');
const revenueData = ref('');
const newCustomers = ref('');
const activeUsers = ref('');

const revenues = [
  {
    id: 1,
    title: 'Active Trials',
    no_attribute: null,
    time_description: 'Last 28 days',
    icon: DollarSign,
  },
  {
    id: 2,
    title: 'Active Subcriptions',
    no_attribute: null,
    time_description: 'Last 28 days',
    icon: DollarSign,
  },
  {
    id: 3,
    title: 'MRR',
    no_attribute: null,
    time_description: 'Monthly Recurring Revenue',
    icon: Activity,
  },
  {
    id: 4,
    title: 'Revenue',
    no_attribute: null,
    time_description: 'Last 28 days',
    icon: Activity,
  },
  {
    id: 5,
    title: 'New Customers',
    no_attribute: null,
    time_description: 'Last 28 days',
    icon: UserRoundPlus,
  },
  {
    id: 6,
    title: 'Active Users',
    no_attribute: null,
    time_description: 'Last 28 days',
    icon: UserRoundCheck,
  },
];

onBeforeMount(() => {
  fetchData();
});
const fetchData = async () => {
  try {
    await getActiveTrials().then((res) => {
      activeTrials.value = res['data']['metadata']['active_trials_formatted'];
      revenues[0].no_attribute = activeTrials.value;
    });
    await getActiveSubs().then((res) => {
      activeSubs.value = res['data']['metadata']['active_subs_formatted'];
      revenues[1].no_attribute = activeSubs.value;
    });
    await getRevenues().then((res) => {
      monthlyRecurringRevenue.value =
        res['data']['metadata']['revenue_formatted'];
      revenueData.value = res['data']['metadata']['revenue_formatted'];
      revenues[2].no_attribute = monthlyRecurringRevenue.value;
      revenues[3].no_attribute = revenueData.value;
    });
    await getNewCustomers().then((res) => {
      newCustomers.value = res['data']['metadata']['new_customers_formatted'];
      revenues[4].no_attribute = newCustomers.value;
    });
    await getActiveUsers().then((res) => {
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
