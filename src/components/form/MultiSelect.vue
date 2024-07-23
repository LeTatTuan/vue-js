<script setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const props = defineProps({
  options: {
    type: Array,
    require: false
  },
  modelValue: {
    type: Array,
    required: false
  },
  placeholder: String,
  isSelect: {
    type: Boolean,
    default: false,
    required: false
  }
});

const target = ref(null);
const show = ref(false);
const currentIconDropdown = computed(() => (show.value ? ChevronUp : ChevronDown));
const emit = defineEmits(['update:modelValue']);
onClickOutside(target, () => {
  show.value = false;
});
</script>

<template>
  <div>
    <div>
      <select class="hidden">
        <option v-for="option in options" :key="option._id" :value="option._id" :disabled="isSelect ? false : true">
          {{ option.name }}
        </option>
      </select>

      <div class="flex flex-col items-center">
        <div class="relative inline-block w-full">
          <div class="relative flex flex-col items-center" @click="show = true">
            <div class="w-full">
              <div class="mb-2 flex outline-none">
                <div v-if="options && options.length > 0" class="flex flex-auto flex-wrap gap-3">
                  <div v-for="item in modelValue" :key="item">
                    <div
                      class="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                    >
                      <div class="max-w-full flex-initial" :class="!isSelect && 'text-xs'">
                        {{ isSelect ? options.find((option) => option._id === item).name : item
                        }}
                      </div>
                      <div v-if="isSelect" class="flex flex-auto flex-row-reverse">
                        <div class="cursor-pointer pl-2 hover:text-danger" @click="emit('update:modelValue', item)">
                          <svg
                            class="fill-current"
                            role="button"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-show="modelValue.length === 0" class="flex-1">
                    <input
                      :placeholder="placeholder"
                      class="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                      :value="modelValue"
                      disabled
                    />
                  </div>
                </div>
                <div class="flex w-8 items-center py-1 pl-1 pr-1">
                  <div class="h-6 w-6 cursor-pointer outline-none focus:outline-none">
                    <component :is="currentIconDropdown" class="h-5 w-5 mr-2" @click="show = !show" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4">
              <div
                v-show="show"
                ref="target"
                class="max-h-select absolute left-0 top-full z-[70] w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input"
              >
                <div class="flex w-full flex-col">
                  <div v-for="option in options" :key="option._id">
                    <div
                      class="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                      @click="emit('update:modelValue', option._id)"
                    >
                      <div
                        :class="[
                          'relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:bg-blue-200',
                          modelValue.includes(option._id) ? 'text-blue-500' : '',
                        ]"
                      >
                        <div class="flex w-full items-center">
                          <div class="mx-2 leading-6">{{ option.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
