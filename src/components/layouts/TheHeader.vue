<script setup>
import { authStore } from '@/stores';
import AccountDropdown from '@/components/Users/AccountDropdown.vue';
</script>

<template>
  <div class="border-b row">
    <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5">
      <img src="../../assets/logo.png" alt="Logo" class="h-8 mr-4" />

      <div v-if="authStore.user" class="flex items-center gap-5">
        <p>Hello, {{ authStore.user.username }}</p>
        <button @click="showMenuAccount">
          <img
            class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
            src="https://res.cloudinary.com/dosn3ilqw/image/upload/v1715852654/samples/man-portrait.jpg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
</template>