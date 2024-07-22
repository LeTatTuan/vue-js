<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { PanelsTopLeft, Fingerprint, User, LogOut } from 'lucide-vue-next';
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
onBeforeMount(() => {});
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              User Management
              <span class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  :class="open ? 'transform rotate-90' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                      </svg>
                      Users
                      <span class="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          :class="open ? 'transform rotate-90' : ''"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul>
                        <router-link v-slot="{ href, navigate }" :to="RoutePath.ManageUsers" custom>
                          <li class="pl-12" :class="[isUsers ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
                            <a class="py-3 flex items-center" :href="href" @click="navigate">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                              </svg>
                              User List
                            </a>
                          </li>
                        </router-link>

                        <li class="pl-12 hover:bg-gray-700 hidden">
                          <a href="#" class="py-3 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            User Detail
                          </a>
                        </li>
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
