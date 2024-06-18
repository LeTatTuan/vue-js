<script setup lang="ts">
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { ref } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/UI/button';
import { RangeCalendar } from '@/components/UI/range-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UI/popover';

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

const endDate = new Date(new Date().getTime());
const calendarDate = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

const dateRange = ref({
  start: calendarDate.subtract({ months: 1 }),
  end: calendarDate,
});

const props = defineProps({
  column: Object,
});

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
          :class="cn('w-[300px] justify-start text-left font-normal', !dateRange && 'text-muted-foreground')"
        >
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