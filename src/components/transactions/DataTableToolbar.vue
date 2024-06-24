<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import DataTableFacetedFilter from './DataTableFacetedFilter.vue';
import FilterDateRange from './FilterDateRange.vue';
import { X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProjects } from '@/services';

const projects = ref([]);
const projectsForFilter = ref([]);

onBeforeMount(() => {
  fetchProjects();
});
const fetchProjects = async () => {
  try {
    const res = await getProjects();
    projects.value = res['data']['metadata']['projects'];

    projectsForFilter.value = projects.value.map((project) => {
      return {
        value: project.keys.bundle_id,
        label: project.name,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

const props = defineProps({
  table: Object,
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2 gap-x-3">
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
        :options="projectsForFilter"
      />
      <FilterDateRange :column="table.getColumn('purchaseDate')" />

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
