<script setup>
import { computed } from "vue";
import { RangeCalendarCellTrigger, useForwardProps } from "radix-vue";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps({
  day: { type: null, required: true },
  month: { type: null, required: true },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RangeCalendarCellTrigger
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'h-9 w-9 p-0 font-normal data-[selected]:opacity-100',
        '[&[data-today]:not([data-selected])]:bg-slate-100 [&[data-today]:not([data-selected])]:text-slate-900 dark:[&[data-today]:not([data-selected])]:bg-slate-800 dark:[&[data-today]:not([data-selected])]:text-slate-50',
        // Selection Start
        'data-[selection-start]:bg-slate-900 data-[selection-start]:text-slate-50 data-[selection-start]:hover:bg-slate-900 data-[selection-start]:hover:text-slate-50 data-[selection-start]:focus:bg-slate-900 data-[selection-start]:focus:text-slate-50 dark:data-[selection-start]:bg-slate-50 dark:data-[selection-start]:text-slate-900 dark:data-[selection-start]:hover:bg-slate-50 dark:data-[selection-start]:hover:text-slate-900 dark:data-[selection-start]:focus:bg-slate-50 dark:data-[selection-start]:focus:text-slate-900',
        // Selection End
        'data-[selection-end]:bg-slate-900 data-[selection-end]:text-slate-50 data-[selection-end]:hover:bg-slate-900 data-[selection-end]:hover:text-slate-50 data-[selection-end]:focus:bg-slate-900 data-[selection-end]:focus:text-slate-50 dark:data-[selection-end]:bg-slate-50 dark:data-[selection-end]:text-slate-900 dark:data-[selection-end]:hover:bg-slate-50 dark:data-[selection-end]:hover:text-slate-900 dark:data-[selection-end]:focus:bg-slate-50 dark:data-[selection-end]:focus:text-slate-900',
        // Outside months
        'data-[outside-month]:pointer-events-none data-[outside-month]:text-slate-500 data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-slate-100/50 [&[data-outside-month][data-selected]]:text-slate-500 [&[data-outside-month][data-selected]]:opacity-30 dark:data-[outside-month]:text-slate-400 dark:[&[data-outside-month][data-selected]]:bg-slate-800/50 dark:[&[data-outside-month][data-selected]]:text-slate-400',
        // Disabled
        'data-[disabled]:text-slate-500 data-[disabled]:opacity-50 dark:data-[disabled]:text-slate-400',
        // Unavailable
        'data-[unavailable]:text-slate-50 data-[unavailable]:line-through dark:data-[unavailable]:text-slate-50',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
