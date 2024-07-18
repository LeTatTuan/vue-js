<script setup>
import { onBeforeMount, ref } from 'vue';
import { User, Mail, LockKeyhole, Fingerprint, PanelsTopLeft, Eye, EyeOff } from 'lucide-vue-next';
import MultiSelect from '@/components/form/MultiSelect.vue';
import { generateRandomPassword } from '@/lib/utils';
import { useManageUserStore } from '@/stores';

const userStore = useManageUserStore();
const props = defineProps({
  user: Object,
  title: String,
  btnStr: String,
});

const roles = ref([]);
const projects = ref([]);
const emits = defineEmits(['close', 'updateUser']);
const userData = ref({
  name: '',
  email: '',
  password: generateRandomPassword(),
  roles: [],
  projects: [],
});
const isShowPassword = ref(false);

onBeforeMount(async () => {
  userStore.fetchRoles(roles);
  userStore.fetchProjects(projects);
});

if (props.user) {
  Object.keys(userData.value).forEach((key) => {
    if (props.user[key] !== undefined) {
      userData.value[key] = props.user[key];
    }
  });
}

const close = () => {
  emits('close');
};

const submit = () => {
  emits('updateUser', userData.value);
};

const togglePasswordVisibility = () => {
  isShowPassword.value = !isShowPassword.value;
};

const updateListRole = (value) => {
  const listItems = userData.value.roles;
  if (listItems.includes(value)) {
    listItems.splice(listItems.indexOf(value), 1);
  } else {
    listItems.push(value);
  }
};

const updateListProject = (value) => {
  const listItems = userData.value.projects;
  if (listItems.includes(value)) {
    listItems.splice(listItems.indexOf(value), 1);
  } else {
    listItems.push(value);
  }
};
</script>  

<template>
  <div
    class="fixed bg-[#0000008f] z-[60] w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center fadeIn"
    @click="close"
  >
    <div class="w-[550px] h-fit bg-white rounded-2xl flex p-10 flex-col gap-3" @click.stop="">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">
        {{ props.title }}
      </h2>
      <form class="space-y-4" @submit.prevent="submit">
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <User />
          </span>
          <input
            id="name"
            v-model="userData.name"
            name="name"
            type="text"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Name"
            required=""
          />
        </div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <Mail />
          </span>
          <input
            id="email"
            v-model="userData.email"
            name="email"
            type="email"
            autocomplete="email"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Email address"
            required=""
            :disabled="props.user"
          />
        </div>

        <div v-if="!props.user" class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <LockKeyhole />
          </span>
          <input
            id="password"
            v-model="userData.password"
            name="password"
            :type="isShowPassword ? 'text' : 'password'"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            disabled
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            @click="togglePasswordVisibility"
          >
            <EyeOff v-if="isShowPassword" />
            <Eye v-else />
          </span>
        </div>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <Fingerprint />
          </span>
          <div class="w-full py-2 text-sm text-gray-900 rounded-md pl-10 border border-gray-300">
            <MultiSelect
              :modelValue="userData.roles"
              :options="roles"
              placeholder="Role"
              :isSelect="true"
              @update:modelValue="(value) => updateListRole(value)"
            />
          </div>
        </div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <PanelsTopLeft />
          </span>
          <div class="w-full py-2 text-sm text-gray-900 rounded-md pl-10 border border-gray-300">
            <MultiSelect
              :modelValue="userData.projects"
              :options="projects"
              placeholder="Project"
              :isSelect="true"
              @update:modelValue="(value) => updateListProject(value)"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ props.btnStr }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>