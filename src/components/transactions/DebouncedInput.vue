<template>
  <input v-model="localValue" @input="debounceOnInput" v-bind="$attrs" />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  value: [String, Number],
  debounce: {
    type: Number,
    default: 500,
  },
  onChange: {
    type: Function,
    required: true,
  },
});

const localValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    localValue.value = newValue;
  }
);

let timeout;
const debounceOnInput = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    props.onChange(localValue.value);
  }, props.debounce);
};
</script>
