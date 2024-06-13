<template>
  <div v-if="filterVariant === 'range'">
    <div class="flex flex-col space-y-2">
      <DebouncedInput
        type="datetime-local"
        :value="minDate"
        @change-value="(value) => updateFilterValue([value, maxDate])"
        placeholder="Min"
        class="w-24 border shadow rounded w-max"
      />

      <DebouncedInput
        type="datetime-local"
        :value="maxDate"
        @change-value="(value) => updateFilterValue([minDate, value])"
        placeholder="Max"
        class="w-24 border shadow rounded w-max"
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
const maxDate = computed(() => columnFilterValue.value?.[1] ?? '') || new Date();

const updateFilterValue = (value) => {
  props.column.setFilterValue(value);
};
</script>
