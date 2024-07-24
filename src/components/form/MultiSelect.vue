<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, X } from 'lucide-vue-next';

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
const emit = defineEmits(['update:modelValue']);
onClickOutside(target, () => {
  show.value = false;
});
</script>

<template>
  <div ref="target" class="relative">
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
                          <X class="h-3 w-3" />
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
                  <div class="h-6 w-6 cursor-pointer outline-none focus:outline-none" @click.prevent="show = !show">
                    <span
                      :class="[
                      'hidden fill-current transition-all sm:block', {'rotate-180': show }]">
                      <ChevronDown class="h-5 w-5 mr-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4">
              <div
                v-show="show"
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
