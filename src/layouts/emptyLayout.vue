<template>
  <div v-if="!auth.isLoggedIn">
    <slot></slot>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores';
const auth = useAuthStore();
</script>
