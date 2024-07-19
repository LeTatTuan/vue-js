<script setup>
import { ref } from 'vue';
import { Mail, Phone, ScanFace, SquarePen, User } from 'lucide-vue-next';

const formData = ref({
  fullName: 'Devid Jhon',
  phoneNumber: '+990 3343 7865',
  emailAddress: 'devidjond45@gmail.com',
  username: 'devidjhon24',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet.'
});

const handleSubmit = () => {
  // Handle form submission for personal information
};

const handleCancel = () => {
  // Handle cancel action for personal information
};
</script>

<template>
  <div class="col-span-5 xl:col-span-3">
    <div
      class="rounded-sm border border-stroke bg-white shadow-default"
    >
      <div class="border-b border-stroke py-4 px-7">
        <h3 class="font-medium text-xl text-black">Personal Information</h3>
      </div>
      <div class="p-7">
        <form @submit.prevent="handleSubmit">
          <!-- Full Name Section -->
          <div class="mb-5 flex flex-col gap-5 sm:flex-row">
            <div class="w-full sm:w-1/2">
              <label
                class="mb-3 block text-sm font-medium text-black"
                for="fullName"
              >Full Name</label>
              <div class="relative text-gray-400">
                  <span class="absolute left-4 top-3 opacity-80">
                   <User class="h-5 w-5 mr-2" />
                  </span>
                <input
                  v-model="formData.fullName"
                  class="w-full rounded border border-stroke bg-gray py-3 pl-11 px-4 font-normal text-black focus:border-primary focus-visible:outline-none"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="+990 3343 7865"
                />
              </div>
            </div>

            <!-- Phone Number Section -->
            <div class="w-full sm:w-1/2">
              <label
                class="mb-3 block text-sm font-medium text-black"
                for="phoneNumber"
              >Phone Number</label>
              <div class="relative text-gray-400">
                  <span class="absolute left-4 top-3 opacity-80">
                   <Phone class="h-5 w-5 mr-2" />
                  </span>
                <input
                  v-model="formData.phoneNumber"
                  class="w-full rounded border border-stroke bg-gray py-3 pl-11 px-4 font-normal text-black focus:border-primary focus-visible:outline-none"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="+990 3343 7865"
                />
              </div>
            </div>
          </div>

          <!-- Email Address Section -->
          <div class="mt-5.5">
            <label
              class="mb-3 block text-sm font-medium text-black"
              for="emailAddress"
            >Email Address</label
            >
            <div class="relative text-gray-400">
                  <span class="absolute left-4 top-3 opacity-80">
                   <Mail class="h-5 w-5 mr-2" />
                  </span>
              <input
                v-model="formData.emailAddress"
                class="w-full rounded border border-stroke bg-gray py-3 pl-11 px-4 font-normal text-black focus:border-primary focus-visible:outline-none"
                type="text"
                name="emailAddress"
                id="emailAddress"
                placeholder="+990 3343 7865"
              />
            </div>
          </div>

          <!-- Username Section -->
          <div class="mt-5">
            <label
              class="mb-3 block text-sm font-medium text-black"
              for="Username"
            >Username</label>
            <div class="relative text-gray-400">
                  <span class="absolute left-4 top-3 opacity-80">
                   <ScanFace class="h-5 w-5 mr-2" />
                  </span>
              <input
                v-model="formData.username"
                class="w-full rounded border border-stroke bg-gray py-3 pl-11 px-4 font-normal text-black focus:border-primary focus-visible:outline-none"
                type="text"
                name="username"
                id="username"
                placeholder="+990 3343 7865"
              />
            </div>
          </div>

          <!-- Bio Section -->
          <div class="mt-5">
            <label class="mb-3 block text-sm font-medium text-black" for="bio"
            >BIO</label
            >
            <div class="relative text-gray-400">
                  <span class="absolute left-4 opacity-80">
                   <SquarePen class="h-5 w-5 mr-2" />
                  </span>
              <textarea
                v-model="formData.bio"
                class="w-full rounded border border-stroke bg-gray py-3 pl-11 pr-4 font-normal text-black focus:border-primary focus-visible:outline-none"
                name="bio"
                id="bio"
                rows="6"
                placeholder="Write your bio here"
              ></textarea>
            </div>
          </div>

          <!-- Save and Cancel Buttons -->
          <div class="flex flex-row justify-end gap-5 mt-5">
            <button
              class="flex justify-center rounded bg-gray-400 border border-stroke py-2 px-6 font-medium text-black hover:bg-opacity-60"
              type="button"
              @click="handleCancel"
            >
              Cancel
            </button>
            <button
              class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-60"
              type="submit"
              @click="handleSubmit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
