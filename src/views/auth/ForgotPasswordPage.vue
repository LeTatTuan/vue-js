<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Forgot Password?</h2>

      <div class="flex items-center justify-center space-x-2 my-4">
        <span class="px-2 text-gray-500 justify-center">
          No Problem! Enter your email or username below and we will send you an email with instructions to reset your
          password.
        </span>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
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
        <div class="flex space-x-4 justify-center">
          <router-link
            :to="RoutePath.Login"
            class="group w-max flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to Login
          </router-link>
          <button
            type="submit"
            class="group w-max flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { forgotPassword } from '@/services';
import { ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { RoutePath } from '@/router';

const notification = useNotification();
const email = ref('');

const submit = async () => {
  try {
    await forgotPassword({ email: email.value }).then(() => {
      email.value = '';
      notification.notify({
        type: 'warn',
        title: 'Please',
        text: 'Please check your email inbox',
      });
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
