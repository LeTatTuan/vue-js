<script setup>
import { computed } from 'vue';
import DataTableFacetedFilter from '@/components/table/DataTableFacetedFilter.vue';
import DateWithPresets from '@/components/date/DateWithPresets.vue';
import { ListRestart, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const props = defineProps({
  table: Object,
  globalSearchText: String,
  options: {
    type: Object,
    default: () => ({}),
    validator: function(value) {
      return typeof value.columnFilter === 'string' && typeof value.columnFilterDate === 'string'
        && (Array.isArray(value.listForFilter) || typeof value.listForFilter === 'undefined');
    }
  }
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
const emit = defineEmits(['updateGlobalSearchText', 'refresh']);

const onInput = (event) => {
  emit('updateGlobalSearchText', event.target.value);
};

const refresh = () => {
  emit('refresh');
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
          :options="options.listForFilter"
        />
      </div>
      <div :v-if="options.columnFilterDate">
        <DateWithPresets
          :v-if="table.getColumn(options.columnFilterDate)"
          :column="table.getColumn(options.columnFilterDate)"
        />
      </div>
      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <div class="flex justify-end ">
      <button
        class="flex flex-row justify-center rounded bg-gray-400 border border-stroke py-2 px-6 font-medium text-black hover:bg-opacity-60"
        @click="refresh"
      >
        <ListRestart class="h-5 w-5 mr-2" />
        Refresh
      </button>
    </div>
  </div>
</template>
