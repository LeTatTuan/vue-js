<template>
  <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5">
    <div class="font-black text-xl">Dashboard</div>
    <div v-if="authStore.user" class="flex items-center gap-5">
      <p>Hello, {{ authStore.user.username }}</p>
      <img
        class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
        src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook-cute-cho-con-gai.jpg?ssl=1"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { authStore } from '@/stores';
console.log('check user: ', authStore.user);
</script>