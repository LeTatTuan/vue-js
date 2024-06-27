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
  options: {
    type: Object,
    default: () => ({}),
    validator: function (value) {
      return (
        typeof value.columnSearch === 'string' &&
        typeof value.columnFilter === 'string' &&
        typeof value.columnFilterDate === 'string' &&
        typeof value.createNew === 'boolean'
      );
    },
  },
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex flex-1 items-center space-x-2 gap-x-3 w-full">
      <div :v-if="options.columnSearch">
        <Input
          placeholder="Filter..."
          :model-value="table.getColumn(options.columnSearch)?.getFilterValue() ?? ''"
          class="h-8 w-[150px] lg:w-[250px]"
          @input="table.getColumn(options.columnSearch)?.setFilterValue($event.target.value)"
        />
      </div>
      <div v-if="options.columnFilter">
        <DataTableFacetedFilter
          v-if="table.getColumn(options.columnFilter)"
          :column="table.getColumn(options.columnFilter)"
          title="Project"
          :options="projectsForFilter"
        />
      </div>
      <div :v-if="options.columnFilterDate">
        <FilterDateRange
          :v-if="table.getColumn(options.columnFilterDate)"
          :column="table.getColumn(options.columnFilterDate)"
        />
      </div>
      <div v-if="options.createNew" class="ml-auto">
        <button class="flex items-center bg-green-500 p-2 text-white rounded text-sm hover:bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>

          Create New
        </button>
      </div>

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
