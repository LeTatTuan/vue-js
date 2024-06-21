<template>
  <div class="flex min-h-screen">
    <div class="flex flex-col flex-grow bg-[#f4f6f9]">
      <the-header />

      <div class="mb-auto flex max-[400px]:flex-col">
        <div class="w-full pt-[72px] max-[400px]:pt-[200px]">
          <slot></slot>
        </div>
      </div>

      <the-footer />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheFooter from '@/components/layouts/TheFooter.vue';
</script>
