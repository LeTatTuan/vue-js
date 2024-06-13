<template>
  <input v-model="localValue" v-bind="$attrs" @input="debounceOnInput" />
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue';

const props = defineProps({
  value: [String, Number],
  debounce: {
    type: Number,
    default: 500,
  },
});

const { emit } = getCurrentInstance();

const localValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    console.log(newValue);
    localValue.value = newValue;
  }
);

let timeout;
const debounceOnInput = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    emit('changeValue', localValue.value);
  }, props.debounce);
};
</script>
