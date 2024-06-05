<script setup>
import { authStore } from '@/stores';
import { ref } from 'vue';

const isPopupVisible = ref(false);

const togglePopup = (value) => {
  console.log('togglePopup');
  console.log(isPopupVisible.value);
  isPopupVisible.value = value;
};
</script>

<template>
  <div class="border-b row">
    <div
      class="fixed top-0 left-0 h-[72px] w-full bg-white z-50 flex justify-between items-center px-5"
    >
      <img src="../../assets/logo.png" alt="Logo" class="h-8 mr-4" />

      <div v-if="authStore.user" class="flex items-center gap-5">
        <p>Hello, {{ authStore.user.username }}</p>
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
              <div class="px-4 text-sm font-medium pt-2">
                Xin chào ,{{ authStore.user.username }}!
              </div>
              <div class="px-4 pb-2 text-xs font-normal text-gray-500">
                {{ authStore.user.email }}
              </div>
            </div>
            <div class="border-b-2"></div>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="editProfile"
              >Edit Profile</a
            >
            <a
              href="#"
              class="block px-4 py-2 pb-3 hover:bg-gray-100"
              @click="authStore.logout()"
              >Log Out</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
