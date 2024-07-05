<script setup>
import { useAuthStore } from '@/stores';
import { ref } from 'vue';

const isPopupVisible = ref(false);
const auth = useAuthStore();

const togglePopup = (value) => {
  isPopupVisible.value = value;
};
</script>

<template>
  <div class="border-b row">
    <div class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5">
      <img src="../../assets/logo.png" alt="Logo" class="h-8 mr-4" />

      <div v-if="auth.user" class="flex items-center gap-5">
        <p>Hello, {{ auth.user.name }}</p>
        <div @click="togglePopup(true)" @mouseleave="togglePopup(false)">
          <img
            class="cursor-pointer w-[40px] h-[40px] rounded-full object-cover"
            src="https://res.cloudinary.com/dosn3ilqw/image/upload/v1715852654/samples/man-portrait.jpg"
            alt=""
          />
          <div
            class="popup bg-white box-shadow-custom absolute right-0 top-14 rounded-xl overflow-hidden"
            :class="{ block: isPopupVisible, hidden: !isPopupVisible }"
          >
            <div class="flex flex-col">
              <div class="px-4 text-sm font-medium pt-2">Xin chào ,{{ auth.user.name }}!</div>
              <div class="px-4 pb-2 text-xs font-normal text-gray-500">
                {{ auth.user.email }}
              </div>
            </div>
            <div class="border-b-2"></div>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="editProfile">Profile</a>
            <a href="#" class="block px-4 py-2 pb-3 hover:bg-gray-100" @click="auth.logout()">Log Out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>