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
  globalSearchText: String,
  options: {
    type: Object,
    default: () => ({}),
    validator: function (value) {
      return typeof value.columnFilter === 'string' && typeof value.columnFilterDate === 'string';
    },
  },
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
const emit = defineEmits(['updateGlobalSearchText']);

const onInput = (event) => {
  emit('updateGlobalSearchText', event.target.value);
};
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <div class="flex flex-1 items-center space-x-2 gap-x-3 w-full">
      <div :v-if="options.globalSearch">
        <Input
          placeholder="Search all columns..."
          :model-value="globalSearchText"
          class="h-8 w-[150px] lg:w-[250px]"
          @input="onInput"
        />
      </div>
      <div v-if="options.columnFilter">
        <DataTableFacetedFilter
          v-if="table.getColumn(options.columnFilter)"
          :column="table.getColumn(options.columnFilter)"
          :title="table.getColumn(options.columnFilter).columnDef.header"
          :options="projectsForFilter"
        />
      </div>
      <div :v-if="options.columnFilterDate">
        <FilterDateRange
          :v-if="table.getColumn(options.columnFilterDate)"
          :column="table.getColumn(options.columnFilterDate)"
        />
      </div>
      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
