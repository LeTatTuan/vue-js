<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDown, Dot, LogOut, User, Users, Warehouse } from 'lucide-vue-next';
import { RoutePath } from '@/router';
import { computed, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores';
import { useRoute } from 'vue-router';

const route = useRoute();
const auth = useAuthStore();

const isDashBoard = computed(() => route.name === 'dashboard');
const isUsers = computed(() => route.name === 'users');
const user = computed(() => auth.user);
const isAdmin = computed(() => auth.isAdmin);
onBeforeMount(() => {
});
</script>

<template>
  <aside v-if="user" class="hidden w-64 bg-gray-800 sm:block">
    <div class="py-3 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
      <router-link to="/" class="text-white">Tailmin</router-link>
    </div>

    <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
        <li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Section</li>
        <router-link v-slot="{ href, navigate }" to="/" custom>
          <li class="px-4 cursor-pointer" :class="[isDashBoard ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
            <a class="py-3 flex items-center" :href="href" @click="navigate">
              <Warehouse class="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
        </router-link>

        <li>
          <Disclosure v-if="isAdmin" v-slot="{ open }" :default-open="isAdmin">
            <DisclosureButton
              class="px-4 py-3 flex items-center w-full hover:bg-gray-700"
              :class="open ? 'bg-gray-700' : ''"
            >
              <Users class="h-5 w-5 mr-2" />
              User Management
              <span
                class="ml-auto"
                :class="['hidden fill-current transition-all sm:block', {
                    'transform -rotate-90': open}]"
              >
                  <ChevronDown />
               </span>
            </DisclosureButton>
            <DisclosurePanel>
              <ul>
                <li>
                  <Disclosure v-slot="{ open }" :default-open="isAdmin">
                    <DisclosureButton
                      class="pl-8 pr-4 py-3 flex items-center w-full hover:bg-gray-700"
                      :class="open ? 'bg-gray-700' : ''"
                    >
                      <Dot class="w-7 h-7 mr-2" />
                      Users
                      <span
                        class="ml-auto"
                        :class="['hidden fill-current transition-all sm:block', {
                        'transform -rotate-90': open}]"
                      >
                        <ChevronDown />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        <router-link v-slot="{ href, navigate }" :to="RoutePath.ManageUsers" custom>
                          <li class="pl-12" :class="[isUsers ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <Dot class="w-7 h-7 mr-2" />
                              User List
                            </a>
                          </li>
                        </router-link>
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </li>

        <li class="px-4 py-2 mt-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Setting</li>

        <li class="px-4 cursor-pointer hover:bg-gray-700">
          <router-link :to="RoutePath.SettingAccount" class="py-3 flex items-center">
            <User class="h-5 w-5 mr-2" />
            Account Settings
          </router-link>
        </li>

        <li class="px-4 cursor-pointer hover:bg-gray-700 hidden">
          <a href="#" class="py-3 flex items-center">
            <LogOut class="h-5 w-5 mr-2" />
            Log out
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
