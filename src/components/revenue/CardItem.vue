<script setup>
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/Card';
const props = defineProps({
  title: String,
  no_attribute: Number,
  time_description: String,
});
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">{{ title }}</CardTitle>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        class="h-4 w-4 text-muted-foreground"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ no_attribute }}</div>
      <p class="text-xs text-muted-foreground">{{ time_description }}</p>
    </CardContent>
  </Card>
</template>