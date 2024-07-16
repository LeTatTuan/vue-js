<script setup lang="ts">
import { ref } from 'vue';
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'radix-vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  list: Array,
  placeholder: String,
  isSelect: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const selected = ref(props.isSelect ? [] : props.list);
</script>

<template>
  <ComboboxRoot v-model="selected" multiple>
    <ComboboxAnchor
      class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 outline-none"
    >
      <ComboboxInput v-if="isSelect" :placeholder="placeholder" />
      <ComboboxInput v-else :placeholder="list[0].name" />
      <ComboboxTrigger>
        <Icon icon="radix-icons:chevron-down" class="h-4 w-4 text-grass11" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-fit mt-2 min-w-[160px] bg-white overflow-hidden rounded ] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
    >
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2"> No {{ placeholder }} </ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem
            v-for="item in list"
            :key="item._id"
            class="flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
            :disabled="isSelect ? false : true"
            :value="item._id"
          >
            <ComboboxItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:check" />
            </ComboboxItemIndicator>
            <span>
              {{ item.name }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
