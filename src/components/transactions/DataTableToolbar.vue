<script setup>
import { computed, h } from 'vue';
import DataTableFacetedFilter from './DataTableFacetedFilter.vue';
import { X } from 'lucide-vue-next';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Palette, Sun, Shell } from 'lucide-vue-next';
const projects = [
  { value: 'com.lutech.ios.themepack', label: 'themepack-ios', icon: h(Palette) },
  { value: 'com.lutech.WeatherLive', label: 'WeatherLive', icon: h(Sun) },
  { value: 'com.lutech.ios.notability', label: 'notability', icon: h(Shell) },
];
const props = defineProps({
  table: Object,
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter products..."
        :model-value="table.getColumn('productId')?.getFilterValue() ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('productId')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('bundleId')"
        :column="table.getColumn('bundleId')"
        title="Project"
        :options="projects"
        class="items-end"
      />

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
