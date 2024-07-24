<script setup>
import { TriangleAlert } from 'lucide-vue-next';

const props = defineProps({
  content: {
    type: String,
    request: true,
    default: 'Please be careful when performing this action!!!'
  },
  btnPrimary: {
    type: String,
    request: true,
    default: 'Save'
  }
});
const emits = defineEmits(['close', 'confirm']);
const close = () => {
  emits('close');
};

const confirm = () => {
  emits('confirm');
};
</script>

<template>
  <div
    class="fixed bg-[#0000008f] z-[60] w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center fadeIn"
    @click="close"
  >
    <div class="flex justify-center bg-white rounded-2xl p-10 flex-col gap-3" @click.stop="">
      <div class="flex flex-col">
        <div class="text-warning m-0 text-[17px] font-semibold flex justify-center mb-5">
          Warning!!!!
        </div>
        <div class="flex justify-center">
          <TriangleAlert class="min-w-max min-h-max stroke-1" />
        </div>
      </div>
      <div class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        {{ props.content }}
      </div>

      <div class="mt-[25px] flex justify-end flex-row gap-5">
        <button
          class="flex justify-center rounded bg-gray-400 border border-stroke py-2 px-6 font-medium text-black hover:bg-opacity-60"
          @click="close"
        >
          Cancel
        </button>
        <button
          class="flex justify-center rounded bg-danger py-2 px-6 font-medium text-white hover:bg-opacity-60"
          @click="confirm"
        >
          {{ btnPrimary }}
        </button>
      </div>
    </div>
  </div>
</template>