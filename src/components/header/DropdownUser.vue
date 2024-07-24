<script setup>
import { useAuthStore } from '@/stores';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { RoutePath } from '@/router';
import { ChevronDown, LogOut, Settings, User } from 'lucide-vue-next';
import DialogVerify from '@/components/commons/DialogVerify.vue';

const target = ref(null);
const dropdownOpen = ref(false);
const authStore = useAuthStore();
const showDialog = ref(false);
onClickOutside(target, () => {
  dropdownOpen.value = false;
});

const closeDialog = () => {
  showDialog.value = false;
};
const confirmLogout = async () => {
  showDialog.value = false;
  await authStore.logout();
};
</script>

<template>
  <div
    v-if="authStore.user"
    ref="target"
    class="relative"
  >
    <div
      class="flex items-center gap-4 cursor-pointer"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <span class="hidden text-right lg:block">
        <span class="block font-medium text-black dark:text-white">{{ authStore.user.name }}</span>
        <span class="block font-medium">{{ authStore.user.email }}</span>
      </span>

      <span class="h-full w-full flex items-center justify-center rounded-full">
          <User class="w-6 h-6" />
      </span>

      <span
        :class="[
          'hidden fill-current transition-all sm:block', {
          'rotate-180': dropdownOpen
        }]"
      >
        <ChevronDown />
      </span>
    </div>

    <!-- Dropdown Start -->
    <div
      v-show="dropdownOpen"
      class="absolute right-0 mt-4 flex w-max flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <ul class="list-none space-y-3 p-3 border-b border-stroke dark:border-strokedark">
        <li>
          <router-link
            :to="RoutePath.SettingAccount"
            class="flex text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <User class="w-5 h-5 mr-3" />
            My Profile
          </router-link>
        </li>
        <li>
          <router-link
            :to="RoutePath.SettingAccount"
            class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <Settings class="w-5 h-5" />
            Account Settings
          </router-link>
        </li>
      </ul>
      <button
        class="p-3 text-sm flex items-center justify-center font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        @click="showDialog = true"
      >
        Log Out
        <LogOut class="w-5 h-5 ml-3" />
      </button>
    </div>
    <!-- Dropdown End -->
    <DialogVerify
      v-if="showDialog"
      content="Are you sure you want to log out?"
      btnPrimary="Log out"
      @close="closeDialog"
      @confirm="confirmLogout"
    />
  </div>
</template>
