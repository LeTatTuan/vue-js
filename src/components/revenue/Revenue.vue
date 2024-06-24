<template>
  <div class="space-y-4 px-5">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-if="activeUsers !== null">
        <card-item
          v-for="revenue in revenues"
          :key="revenue.id"
          :title="revenue.title"
          :no-attribute="revenue.noAttribute"
          :no-attribute-str="revenue.noAttributeStr"
          :time-description="revenue.timeDescription"
          :icon="revenue.icon"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getStatistics } from '@/services';
import { onBeforeMount, h, ref } from 'vue';
import CardItem from './CardItem.vue';
import { DollarSign, Activity, UserRoundPlus, UserRoundCheck } from 'lucide-vue-next';

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
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(DollarSign),
  },
  {
    id: 2,
    title: 'Active Subcriptions',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(DollarSign),
  },
  {
    id: 3,
    title: 'MRR',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Monthly Recurring Revenue',
    icon: h(Activity),
  },
  {
    id: 4,
    title: 'Revenue',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(Activity),
  },
  {
    id: 5,
    title: 'New Customers',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(UserRoundPlus),
  },
  {
    id: 6,
    title: 'Last Active',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(UserRoundCheck),
  },
];

onBeforeMount(() => {
  fetchData();
});
const fetchData = async () => {
  try {
    await getStatistics().then((res) => {
      const data = res['data']['metadata'];
      activeTrials.value = { active_trials: data.active_trials, active_trials_formatted: data.active_trials_formatted };
      revenues[0].noAttribute = activeTrials.value['active_trials'];
      revenues[0].noAttributeStr = activeTrials.value['active_trials_formatted'];

      activeSubs.value = { active_subs: data.active_subs, active_subs_formatted: data.active_subs_formatted };
      revenues[1].noAttribute = activeSubs.value['active_subs'];
      revenues[1].noAttributeStr = activeSubs.value['active_subs_formatted'];

      monthlyRecurringRevenue.value = { revenue: data.revenue, revenue_formatted: data.revenue_formatted };
      revenues[2].noAttribute = monthlyRecurringRevenue.value['revenue'];
      revenues[2].noAttributeStr = monthlyRecurringRevenue.value['revenue_formatted'];

      revenueData.value = { revenue: data.revenue, revenue_formatted: data.revenue_formatted };
      revenues[3].noAttribute = revenueData.value['revenue'];
      revenues[3].noAttributeStr = revenueData.value['revenue_formatted'];

      newCustomers.value = { new_customers: data.new_customers, new_customers_formatted: data.new_customers_formatted };
      revenues[4].noAttribute = newCustomers.value['new_customers'];
      revenues[4].noAttributeStr = newCustomers.value['new_customers_formatted'];

      activeUsers.value = { active_users: data.active_users, active_users_formatted: data.active_users_formatted };
      revenues[5].noAttribute = activeUsers.value['active_users'];
      revenues[5].noAttributeStr = activeUsers.value['active_users_formatted'];
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
