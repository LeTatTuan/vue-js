<template>
  <div class="flex p-7 flex-col gap-5">
    <p class="font-bold text-xl">Settings Page</p>
    <PopupNewUser @updateUser="updateUser" :user="user" title="Personal Information" btnStr="Save" />
  </div>
</template>

<script setup>
import PopupNewUser from '@/components/users/PopupNewUser.vue';
import { useAuthStore } from '@/stores';
import { computed } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { updateUserApi } from '@/services';

const notification = useNotification();
const auth = useAuthStore();

const user = computed(() => auth.user);

const updateUser = async () => {
  try {
    await updateUserApi(user.value._id, user.value).then(async (res) => {
      const data = res['data'];
      notification.notify({
        type: 'success',
        title: 'Success',
        text: data['message'],
      });
    });
  } catch (error) {
    if (error.response?.data?.message) {
      notification.notify({
        type: 'error',
        title: 'Failed',
        text: error.response.data.message,
      });
    }
    console.log(error);
  }
};
</script>
