<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import { resetPassword, verifyToken } from '@/services';
import ErrorPage from '@/components/commons/ErrorPage.vue';
import { RoutePath } from '@/router';

const notification = useNotification();
const router = useRouter();
const tokenExpired = ref(false);
const token = ref('');
const password = ref('');
const confirmPassword = ref('');

onBeforeMount(() => {
  token.value = router.currentRoute.value.query.token;
  checkToken();
});

const checkToken = async () => {
  try {
    await verifyToken({ token: token.value }).then((res) => {
      const data = res['data'];
      notification.notify({
        type: 'success',
        title: 'Valid Token',
        text: data.message,
      });
    });
  } catch (error) {
    if (error.response?.data?.message) {
      notification.notify({
        type: 'error',
        title: 'Invalid Token',
        text: error.response.data.message,
      });
    }
    tokenExpired.value = true;
    console.log(error);
  }
};

const submit = async () => {
  try {
    if (password.value.trim() != confirmPassword.value.trim()) {
      notification.notify({
        type: 'error',
        title: 'Mật khẩu xác nhận không khớp',
      });
      return;
    }
    await resetPassword(token.value, {
      password: password.value.trim(),
      confirm_password: confirmPassword.value.trim(),
    }).then(() => {
      notification.notify({
        type: 'success',
        title: 'Đổi mật khẩu thành công',
        text: 'Vui lòng đăng nhập lại',
      });
    });
    router.push(RoutePath.Login);
  } catch (error) {
    if (error.response?.data?.message) {
      notification.notify({
        type: 'error',
        title: 'Đổi mật khẩu thất bại',
        text: error.response.data.message,
      });
    }
    console.log(error);
  }
};
</script>


<template>
  <ErrorPage
    v-if="tokenExpired"
    title="Invalid Reset Link"
    description="Password reset link is expired."
    :linkRedirect="RoutePath.ForgotPassword"
    btnRedirect="Generate Reset Link"
  />
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Enter New Password</h2>

      <div class="flex items-center justify-center space-x-2 my-4">
        <span class="px-2 text-gray-500 justify-center">
          Looks like you are trying to reset the password for the account. Please enter your new password twice. So we
          can verify you typed it correctly.
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="password"
            v-model="confirmPassword"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Confirm Password"
          />
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>