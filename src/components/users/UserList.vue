<script setup>
import DataTable from '@/components/table/DataTable.vue';
import { onBeforeMount, ref } from 'vue';
import getColumnsUser from '@/components/users/columns';
import PopupNewUser from '@/components/users/PopupNewUser.vue';
import { useManageUserStore } from '@/stores';

const userStore = useManageUserStore();
const users = ref([]);
const currentUser = ref(null);
const columnsUser = ref([]);
const modal = ref({
  PopupNewUser: false,
});

onBeforeMount(() => {
  columnsUser.value = getColumnsUser(showUpdateUser, showDeleteUser);
  userStore.fetchUsers(users);
});

const closePopupNewUser = () => {
  modal.value.PopupNewUser = false;
  currentUser.value = null;
};

const openCreateNewUser = () => {
  modal.value.PopupNewUser = true;
};

const showUpdateUser = async (id) => {
  await userStore.fetchUser(id, currentUser).then((res) => {
    modal.value.PopupNewUser = true;
  });
};

const showDeleteUser = (id) => {
  alert(`Delete user with id: ${id}`);
};

const updateUser = async (user) => {
  await userStore.updateUser(currentUser, user).then(() => {
    userStore.fetchUsers(users);
    closePopupNewUser();
  });
};
</script>

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
        columnFilter: '',
        columnFilterDate: 'createdAt',
      }"
    />
  </div>

  <PopupNewUser
    v-if="modal.PopupNewUser"
    :user="currentUser"
    :title="currentUser ? 'User Update' : 'Add new user'"
    :btnStr="currentUser ? 'Update' : 'Add new'"
    @updateUser="updateUser"
    @close="closePopupNewUser"
  />
</template>