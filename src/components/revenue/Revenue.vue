<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardItem
        v-for="revenue in revenues"
        :key="revenue.id"
        :title="revenue.title"
        :no_attribute="revenue.no_attribute"
        :time_description="revenue.time_description"
      />
    </div>
  </div>
</template>

<script setup>
import CardItem from './CardItem.vue';

const revenues = [
  {
    id: 1,
    title: 'Active trials',
    no_attribute: 1000,
    time_description: 'In total',
  },
  {
    id: 2,
    title: 'Ongoing trials',
    no_attribute: 750,
    time_description: 'Currently active',
  },
  {
    id: 3,
    title: 'Suspended trials',
    no_attribute: 100,
    time_description: 'Temporarily paused',
  },
  {
    id: 4,
    title: 'Terminated trials',
    no_attribute: 200,
    time_description: 'Discontinued',
  },
  {
    id: 5,
    title: 'Planned trials',
    no_attribute: 300,
    time_description: 'Scheduled to start',
  },
  {
    id: 6,
    title: 'Planned trials',
    no_attribute: 300,
    time_description: 'Scheduled to start',
  },
];
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
