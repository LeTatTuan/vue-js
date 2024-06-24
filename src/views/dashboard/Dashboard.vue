<template>
  <div class="flex p-7 flex-col gap-5">
    <p class="font-bold text-xl">Overview</p>
    <revenue />
    <transaction-list />
  </div>
</template>

<script setup>
import Revenue from '@/components/revenue/Revenue.vue';
import TransactionList from '@/views/TransactionList.vue';
</script>
