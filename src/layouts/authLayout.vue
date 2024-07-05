<template>
  <div class="flex min-h-screen">
    <the-sidebar />
    <div class="flex flex-col flex-grow bg-[#f4f6f9]">
      <the-header />

      <div class="mb-auto flex max-[400px]:flex-col">
        <div class="w-full pt-[72px] max-[400px]:pt-[200px]">
          <router-view />
        </div>
      </div>

      <the-footer />
    </div>
  </div>
</template>

<script setup>
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheFooter from '@/components/layouts/TheFooter.vue';
</script>

