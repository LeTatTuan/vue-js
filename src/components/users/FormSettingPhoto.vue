<script setup>
import userPhoto from '@/assets/images/avatar.jpg';

const handlePhotoSubmit = () => {
  // Handle form submission for user photo
};

const handleFileChange = () => {
  // Handle file change for user photo
};

const handlePhotoCancel = () => {
  // Handle cancel action for user photo
};

const deletePhoto = () => {
  // Handle delete action for user photo
};

const updatePhoto = () => {
  // Handle update action for user photo
};
</script>

<template>
  <div class="col-span-5 xl:col-span-2">
    <div
      class="rounded-sm border border-stroke bg-white shadow-default"
    >
      <div class="border-b border-stroke py-4 px-7">
        <h3 class="font-medium text-xl text-black">Your Photo</h3>
      </div>
      <div class="p-7">
        <form @submit.prevent="handlePhotoSubmit">
          <!-- User Photo Section -->
          <div class="mb-4 flex items-center gap-3">
            <div class="h-14 w-14 rounded-full">
              <img :src="userPhoto" alt="User" class="rounded-full" />
            </div>
            <div>
              <span class="mb-1.5 font-medium text-black dark:text-white">Edit your photo</span>
              <span class="flex gap-2.5">
                  <button class="text-sm font-medium hover:text-primary" @click="deletePhoto">
                    Delete
                  </button>
                  <button class="text-sm font-medium hover:text-primary" @click="updatePhoto">
                    Update
                  </button>
                </span>
            </div>
          </div>

          <!-- File Upload Section -->
          <div
            id="FileUpload"
            class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              @change="handleFileChange"
            />
            <div class="flex flex-col items-center justify-center space-y-3">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
              <p class="text-sm font-medium">
                <span class="text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p class="mt-1.5 text-sm font-medium">SVG, PNG, JPG or GIF</p>
              <p class="text-sm font-medium">(max, 800 X 800px)</p>
            </div>
          </div>

          <!-- Save and Cancel Buttons for Photo Section -->
          <div class="flex flex-row justify-end gap-5 mt-5">
            <button
              class="flex justify-center rounded bg-gray-400 border border-stroke py-2 px-6 font-medium text-black hover:bg-opacity-60"
              type="button"
              @click="handlePhotoCancel"
            >
              Cancel
            </button>
            <button
              class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-60"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>