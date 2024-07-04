<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <div class="flex items-center justify-center space-x-2 my-4">
        <CircleX class="bg-cover bg-red-400 rounded-full" size="50" />
      </div>
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">{{ props.title }}</h2>

      <div class="flex items-center justify-center space-x-2 my-4">
        <span class="px-2 text-gray-500 justify-center">
          {{ props.description }}
        </span>
      </div>

      <div>
        <router-link
          :to="props.linkRedirect"
          class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ props.btnRedirect }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleX } from 'lucide-vue-next';

const props = defineProps({
  title: String,
  description: String,
  linkRedirect: String,
  btnRedirect: String,
});
</script>
