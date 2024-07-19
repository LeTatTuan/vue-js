<script setup>
import { h, onBeforeMount, ref } from 'vue';
import CardItem from './CardItem.vue';
import { Activity, DollarSign, UserRoundCheck, UserRoundPlus } from 'lucide-vue-next';
import MultiSelect from '@/components/form/MultiSelect.vue';
import { useManageUserStore } from '@/stores';

const userStore = useManageUserStore();
const activeTrials = ref('');
const activeSubs = ref('');
const monthlyRecurringRevenue = ref('');
const revenueData = ref('');
const newCustomers = ref('');
const activeUsers = ref('');
const projects = ref([]);
let selectedProjects = ref([]);
const revenues = [
  {
    id: 1,
    title: 'Active Trials',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(DollarSign)
  },
  {
    id: 2,
    title: 'Active Subcriptions',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(DollarSign)
  },
  {
    id: 3,
    title: 'MRR',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Monthly Recurring Revenue',
    icon: h(Activity)
  },
  {
    id: 4,
    title: 'Revenue',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(Activity)
  },
  {
    id: 5,
    title: 'New Customers',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(UserRoundPlus)
  },
  {
    id: 6,
    title: 'Last Active',
    noAttribute: 0,
    noAttributeStr: null,
    timeDescription: 'Last 28 days',
    icon: h(UserRoundCheck)
  }
];

onBeforeMount(() => {
  fetchData();
  fetchSelectedProjects();
});
const fetchSelectedProjects = async () => {
  await userStore.fetchProjects(projects).then(() => {
    selectedProjects.value = projects.value.map(project => project._id);
  });
};
const fetchData = async () => {
  await userStore.fetchStatistics(activeTrials, activeSubs, monthlyRecurringRevenue, revenueData, newCustomers, activeUsers, revenues);
};
const updateListProject = (value) => {
  const listItems = selectedProjects.value;
  if (listItems.includes(value)) {
    listItems.splice(listItems.indexOf(value), 1);
  } else {
    listItems.push(value);
  }
};

const submit = async () => {

};

</script>

<template>
  <div class="space-y-4 px-5">
    <div class="flex justify-end flex-row gap-5">
      <MultiSelect
        class="w-1/3"
        :modelValue="selectedProjects"
        :options="projects"
        placeholder="Project"
        :isSelect="true"
        @update:modelValue="(value) => updateListProject(value)"
      />
      <button
        class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-60 w-fit h-fit"
        @click="submit"
      >
        Submit
      </button>
    </div>
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
