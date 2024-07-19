<script setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { ref, watch } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const props = defineProps({
  column: Object,
});

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

const endDate = new Date(new Date().getTime());
const calendarDate = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

const dateRange = ref({
  start: calendarDate.subtract({ months: 1 }),
  end: calendarDate,
});

watch(
  () => props.column.getFilterValue(),
  (newValue) => {
    if (!newValue) {
      dateRange.value = {
        start: calendarDate.subtract({ months: 1 }),
        end: calendarDate,
      };
    }
  }
);

const updateFilterValue = (value) => {
  dateRange.value.start = value.start;
  dateRange.value.end = value.end;
  props.column.setFilterValue([value.start, value.end]);
};
</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="cn('max-w-max justify-start text-left font-normal', !dateRange && 'text-muted-foreground')"
        >
          <div class="mr-1 font-bold">{{ props.column.columnDef.header }}</div>
          <CalendarIcon class="mr-2 h-4 w-4" />

          <template v-if="dateRange.start">
            <template v-if="dateRange.end">
              {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Pick a date </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="end">
        <RangeCalendar
          v-model="dateRange"
          weekday-format="short"
          :number-of-months="2"
          initial-focus
          :placeholder="dateRange.start"
          @update:modelValue="(value) => updateFilterValue(value)"
          @update:startValue="(start) => updateFilterValue({ start })"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>