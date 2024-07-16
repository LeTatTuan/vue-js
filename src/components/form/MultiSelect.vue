<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  list: {
    type: Array,
    require: true,
  },
  placeholder: String,
  isSelect: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const target = ref(null);
const options = ref(props.list);
const selected = ref([]);
const show = ref(false);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = true;
};

const isOpen = () => {
  return show.value === true;
};

onClickOutside(target, () => {
  show.value = false;
});

const select = (index, event) => {
  const newOptions = [...options.value];
  if (!newOptions[index].selected) {
    newOptions[index].selected = true;
    newOptions[index].element = event.target;
    selected.value = [...selected.value, index];
  } else {
    newOptions[index].selected = false;
    selected.value = selected.value.filter((i) => i !== index);
  }
  options.value = newOptions;
};

const remove = (index) => {
  const newOptions = [...options.value];
  if (selected.value.includes(index)) {
    newOptions[index].selected = false;
    selected.value = selected.value.filter((i) => i !== index);
    options.value = newOptions;
  }
};

const selectedValues = () => {
  return selected.value.map((option) => options.value[option].value);
};
</script>

<template>
  <div>
    <div>
      <select class="hidden">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>

      <div class="flex flex-col items-center">
        <input name="values" type="hidden" :value="selectedValues()" />
        <div class="relative inline-block w-full">
          <div class="relative flex flex-col items-center" @click="open">
            <div class="w-full">
              <div class="mb-2 flex outline-none">
                <div class="flex flex-auto flex-wrap gap-3">
                  <template v-for="index in selected" :key="index">
                    <div
                      class="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                    >
                      <div class="max-w-full flex-initial">{{ options[index].text }}</div>
                      <div class="flex flex-auto flex-row-reverse">
                        <div class="cursor-pointer pl-2 hover:text-danger" @click="remove(index)">
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
                  </template>

                  <div v-show="selected.length === 0" class="flex-1">
                    <input
                      :placeholder="placeholder"
                      class="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                      :value="selectedValues()"
                    />
                  </div>
                </div>
                <div class="flex w-8 items-center py-1 pl-1 pr-1">
                  <div class="h-6 w-6 cursor-pointer outline-none focus:outline-none">
                    <ChevronUp v-if="isOpen()" class="h-5 w-5 mr-2" @click="close" />
                    <ChevronDown v-else class="h-5 w-5 mr-2" @click="open" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4">
              <div
                v-show="isOpen()"
                ref="target"
                class="max-h-select absolute left-0 top-full z-[70] w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input"
              >
                <div class="flex w-full flex-col">
                  <div v-for="(option, index) in options" :key="index">
                    <div
                      class="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                      @click="select(index, $event)"
                    >
                      <div
                        :class="[
                          'relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:bg-blue-200',
                          option.selected ? 'text-blue-500' : '',
                        ]"
                      >
                        <div class="flex w-full items-center">
                          <div class="mx-2 leading-6">{{ option.text }}</div>
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
