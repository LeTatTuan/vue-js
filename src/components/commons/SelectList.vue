<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const props = defineProps({
  list: Array,
  name: String,
});
</script>

<template>
  <Select>
    <SelectTrigger class="w-fit">
      <SelectValue :placeholder="`${list[0].name}`" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ name }}</SelectLabel>
        <SelectItem v-for="item in list" :key="item._id" :value="item._id">
          {{ item.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>