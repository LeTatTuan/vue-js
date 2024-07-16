<script setup>
import DropdownUser from '@/components/header/DropdownUser.vue';
</script>

<template>
  <div class="border-b row">
    <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5">
      <img src="../../assets/logo.png" alt="Logo" class="h-8 mr-4" />
      <DropdownUser />
    </div>
  </div>
</template>