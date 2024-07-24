<script setup>
import DataTable from '@/components/table/DataTable.vue';
import { onBeforeMount, ref } from 'vue';
import getColumnsUser from '@/components/users/columns';
import PopupNewUser from '@/components/users/PopupNewUser.vue';
import { useManageUserStore } from '@/stores';
import DialogVerify from '@/components/commons/DialogVerify.vue';
import { Plus } from 'lucide-vue-next';

const userStore = useManageUserStore();
const tableStore = useManageUserStore();
const users = ref([]);
const currentUser = ref(null);
const columnsUser = ref([]);
const modal = ref({
  PopupNewUser: false,
  showDialog: false
});
const userId = ref(null);

onBeforeMount(() => {
  columnsUser.value = getColumnsUser(showUpdateUser, showDeleteUser);
  userStore.fetchUsers(users);
});

const closePopupNewUser = () => {
  modal.value.PopupNewUser = false;
  modal.value.showDialog = false;
  currentUser.value = null;
  userId.value = null;
};

const openCreateNewUser = () => {
  modal.value.PopupNewUser = true;
};

const showUpdateUser = async (id) => {
  await userStore.fetchUser(id, currentUser).then(() => {
    modal.value.PopupNewUser = true;
  });
};

const showDeleteUser = (id) => {
  modal.value.showDialog = true;
  userId.value = id;
};

const updateUser = async (user) => {
  await userStore.updateUser(currentUser, user).then(() => {
    userStore.fetchUsers(users);
    closePopupNewUser();
  });
};

const confirmDeleteUser = async () => {
  modal.value.showDialog = false;
  alert(`You have successfully deleted the user with id: ${userId.value}`);
};

const refresh = async () => {
  tableStore.loadingTable = true;
  await userStore.fetchUsers(users).then(() => {
    tableStore.loadingTable = false;
  });
};
</script>

<template>
  <div v-bind="$attrs">
    <div class="flex justify-end float-right py-20 px-5 mb-5">
      <button
        class="flex items-center bg-green-500 p-2 text-white rounded text-sm hover:bg-green-600"
        @click="openCreateNewUser"
      >
        <Plus />
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
      @refresh="refresh"
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

  <DialogVerify
    v-if="modal.showDialog"
    content="Are you sure you want to delete this user?"
    btnPrimary="Delete"
    @close="closePopupNewUser"
    @confirm="confirmDeleteUser"
  />
</template>