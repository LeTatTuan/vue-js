<script setup>
import { Button } from '@/components/ui/button';

const props = defineProps({
  value: String,
});

const emits = defineEmits(['update', 'delete']);

const handleUpdate = () => {
  emits('update', props.value);
};

const handleDelete = () => {
  emits('delete', props.value);
};
</script>

<template>
  <div class="flex gap-2.5">
    <Button @click="handleUpdate" variant="secondary">Edit</Button>
    <Button @click="handleDelete" type="destructive">Delete</Button>
  </div>
</template>
