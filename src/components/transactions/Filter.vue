<template>
  <div v-if="filterVariant === 'range'">
    <div class="flex space-x-2">
      <DebouncedInput
        type="date"
        :value="minDate"
        @onChange="(value) => updateFilterValue([value, maxDate])"
        placeholder="Min"
        class="w-24 border shadow rounded"
      />

      <DebouncedInput
        type="date"
        :value="maxDate"
        @onChange="(value) => updateFilterValue([minDate, value])"
        placeholder="Max"
        class="w-24 border shadow rounded"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DebouncedInput from './DebouncedInput.vue';

const props = defineProps({
  column: Object,
});

const columnFilterValue = ref(props.column.getFilterValue());
const filterVariant = ref(props.column.columnDef.meta?.filterVariant);

const minDate = computed(() => columnFilterValue.value?.[0] ?? '');
const maxDate = computed(() => columnFilterValue.value?.[1] ?? '');

const updateFilterValue = (value) => {
  props.column.setFilterValue(value);
};
</script>
