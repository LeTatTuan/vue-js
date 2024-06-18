<template>
  <div></div>
  <div v-if="filterVariant === 'range'">
    <div class="flex flex-col space-y-2">
      <DebouncedInput
        type="datetime-local"
        :value="minDate"
        placeholder="Min"
        class="w-24 border shadow rounded w-max"
        @change-value="(value) => updateFilterValue([value, maxDate])"
      />

      <DebouncedInput
        type="datetime-local"
        :value="maxDate"
        placeholder="Max"
        class="w-24 border shadow rounded w-max"
        @change-value="(value) => updateFilterValue([minDate, value])"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DebouncedInput from './DebouncedInput.vue';

const props = defineProps({
  column: Object,
});

const columnFilterValue = ref(props.column.getFilterValue());
const filterVariant = ref(props.column.columnDef.meta?.filterVariant);

const minDate = ref(columnFilterValue.value?.[0] ?? '');
const maxDate = ref(columnFilterValue.value?.[1] ?? '') || ref(new Date().getTime());

const updateFilterValue = ([min, max]) => {
  minDate.value = min;
  maxDate.value = max;
  props.column.setFilterValue([min, max]);
};
</script>
