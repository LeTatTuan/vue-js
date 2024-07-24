<script setup>
import { ref } from 'vue';
import { RoutePath } from '@/router';
import { useAuthStore } from '@/stores';
import { LockKeyhole, Mail } from 'lucide-vue-next';

const email = ref('');
const password = ref('');
const auth = useAuthStore();

const submit = async () => {
  await auth.login({ email: email.value, password: password.value }).then(() => {
    email.value = '';
    password.value = '';
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Login to your account</h2>

      <div class="flex items-center justify-center space-x-2 my-4">
        <span class="px-2 text-gray-500 justify-center"> It's nice to see you again. </span>
      </div>
      <form class="space-y-4" @submit.prevent="submit">
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <Mail />
          </span>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Email address"
            required=""
          />
        </div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
           <LockKeyhole />
          </span>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Password"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="RoutePath.ForgotPassword" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>