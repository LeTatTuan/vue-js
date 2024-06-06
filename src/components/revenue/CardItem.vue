<script setup>
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/UI/Card';
import { DollarSign } from 'lucide-vue-next';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  noAttribute: { type: Number, default: 0 },
  noAttributeStr: {
    type: String,
    default: '',
  },
  timeDescription: {
    type: String,
    default: '',
  },
  // eslint-disable-next-line vue/require-default-prop
  icon: { type: Object },
});
</script>

<template>
  <card>
    <card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
      <card-title class="text-sm font-medium">{{ title }}</card-title>
      <component :is="icon" class="mr-2 h-4 w-4 text-muted-foreground hover:text-gray-500" @click="handleClick" />
    </card-header>
    <card-content>
      <template v-if="noAttribute">
        <div class="text-2xl font-bold">
          {{ noAttributeStr }}
        </div>
      </template>
      <div v-else class="animate-pulse shadow rounded-md p-4 max-w-sm w-full bg-gray-200 rounded h-10 text-2xl"></div>
    </card-content>
    <card-footer>
      <p class="text-xs text-muted-foreground">{{ timeDescription }}</p>
    </card-footer>
  </card>
</template>
