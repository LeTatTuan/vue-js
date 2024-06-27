<script setup>
import DataTable from '@/components/transactions/DataTable.vue';
import { getUsersApi } from '@/services';
import { onBeforeMount, ref } from 'vue';
import columnsUser from '@/components/users/columns';

const users = ref([]);

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
</script>

<template>
  <div v-bind="$attrs">
    <data-table
      v-if="users.length > 0"
      :data="users"
      :columns="columnsUser"
      title="User List"
      :options="{
        columnSearch: 'user',
        columnFilterDate: 'createdAt',
        createNew: true,
      }"
    />
  </div>
</template>