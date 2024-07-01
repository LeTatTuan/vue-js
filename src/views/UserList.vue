<template>
  <div v-bind="$attrs">
    <div class="float-right py-20 px-5">
      <button
        class="flex items-center bg-green-500 p-2 text-white rounded text-sm hover:bg-green-600"
        @click="openCreateNewUser"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>

        Create New
      </button>
    </div>
    <data-table
      v-if="users.length > 0"
      :data="users"
      :columns="columnsUser"
      title="User List"
      :options="{
        columnSearch: 'user',
        columnFilterDate: 'createdAt',
        createNew: false,
      }"
    />
  </div>

  <PopupNewUser v-if="modal.PopupNewUser" @close="closePopupNewUser" @updateUser="updateUser" />
</template>

<script setup>
import DataTable from '@/components/transactions/DataTable.vue';
import { createUser, getUsersApi } from '@/services';
import { onBeforeMount, ref } from 'vue';
import columnsUser from '@/components/users/columns';
import PopupNewUser from '@/components/users/PopupNewUser.vue';
import { useNotification } from '@kyvg/vue3-notification';

const notification = useNotification();
const users = ref([]);
const modal = ref({
  PopupNewUser: false,
});

onBeforeMount(() => {
  fetchUsers();
});
const fetchUsers = async () => {
  try {
    const res = await getUsersApi();
    const data = res['data']['metadata'];
    users.value = data.map((item) => {
      const user = {
        name: item.name,
        email: item.email,
      };
      return { ...item, user, name: null, email: null };
    });
  } catch (error) {
    console.log(error);
  }
};

const closePopupNewUser = () => {
  modal.value.PopupNewUser = false;
};

const openCreateNewUser = () => {
  modal.value.PopupNewUser = true;
};

const updateUser = async (user) => {
  console.log('check user: ', user);
  try {
    await createUser(user).then((res) => {
      const data = res['data'];
      console.log('check res: ', data);
      notification.notify({
        type: 'success',
        title: 'Tạo người dùng thành công',
        text: data['message'],
      });
    });
  } catch (error) {
    if (error.response?.data?.message) {
      notification.notify({
        type: 'error',
        title: 'Tạo người dùng thất bại',
        text: error.response.data.message,
      });
    }
    console.log(error);
  }
};
</script>