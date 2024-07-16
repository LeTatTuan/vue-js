<script setup>
import Revenue from '@/components/revenue/Revenue.vue';
import TransactionList from '@/components/transaction/TransactionList.vue';
</script>

<template>
  <div class="flex p-7 flex-col gap-5">
    <p class="font-bold text-xl">Overview</p>
    <revenue />
    <transaction-list />
  </div>
</template>