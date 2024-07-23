<script setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { ref, watch } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { DATE_PICKER_PRESETS } from '@/constants';

const props = defineProps({
  column: Object
});

const items = [
  { value: DATE_PICKER_PRESETS.today, label: 'Today', isDateRange: false },
  { value: DATE_PICKER_PRESETS.tomorrow, label: 'Tomorrow', isDateRange: false },
  { value: DATE_PICKER_PRESETS.in3days, label: 'In 3 days', isDateRange: false },
  { value: DATE_PICKER_PRESETS.in7days, label: 'In a week', isDateRange: false },
  { value: DATE_PICKER_PRESETS.onlyStartDay, label: 'Only start day', isDateRange: false },
  { value: DATE_PICKER_PRESETS.onlyEndDay, label: 'Only end day', isDateRange: false },
  { value: DATE_PICKER_PRESETS.rangeDate, label: 'Custom range day', isDateRange: true }
];
const itemSelected = ref(items[6]);
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
});

const endDate = new Date(new Date().getTime());
const calendarDate = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

const dateRange = ref({
  start: calendarDate.subtract({ months: 1 }),
  end: calendarDate
});
const singleDate = ref();

watch(
  () => props.column.getFilterValue(),
  (newValue) => {
    if (!newValue) {
      itemSelected.value = items[6];
      dateRange.value = {
        start: calendarDate.subtract({ months: 1 }),
        end: calendarDate
      };
    }
  }
);

const updateFilterValue = (value) => {
  dateRange.value.start = value.start;
  dateRange.value.end = value.end;
  props.column.setFilterValue([value.start, value.end]);
};

const updateSingleDate = (value) => {
  singleDate.value = value;
  let dateRange;
  switch (itemSelected.value.value) {
    case DATE_PICKER_PRESETS.onlyStartDay:
      dateRange = {
        start: singleDate.value,
        end: new CalendarDate(9999, endDate.getMonth() + 1, endDate.getDate())
      };
      break;
    case DATE_PICKER_PRESETS.onlyEndDay:
      dateRange = {
        start: new CalendarDate(2000, endDate.getMonth() + 1, endDate.getDate()),
        end: singleDate.value
      };
      break;
  }
  updateFilterValue(dateRange);
};

const handleSelectFilterDate = (value) => {
  itemSelected.value = items.find(item => item.value == value);
  switch (+value) {
    case DATE_PICKER_PRESETS.today:
    case DATE_PICKER_PRESETS.tomorrow:
    case DATE_PICKER_PRESETS.in3days:
    case DATE_PICKER_PRESETS.in7days:
      singleDate.value = today(getLocalTimeZone()).add({ days: Number(value) });
      updateFilterValue({ end: singleDate.value });
      break;
  }
};
</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger>
        <Button
          v-if="itemSelected.isDateRange"
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
          <template v-else> Pick a date</template>
        </Button>
        <Button
          v-else
          variant="outline"
          :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !singleDate && 'text-muted-foreground',
        )"
        >
          <div class="mr-1 font-bold">{{ props.column.columnDef.header }}</div>
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ singleDate ? df.format(singleDate.toDate(getLocalTimeZone())) : 'Pick a date' }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="end">
        <Select
          @update:model-value="handleSelectFilterDate"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the filter time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="item in items" :key="item.value" :value="item.value.toString()">
              {{ item.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <div>
          <RangeCalendar
            v-if="itemSelected.isDateRange"
            v-model="dateRange"
            weekday-format="short"
            :number-of-months="2"
            initial-focus
            :placeholder="dateRange.start"
            @update:modelValue="(value) => updateFilterValue(value)"
            @update:startValue="(start) => updateFilterValue({ start })"
          />
          <Calendar
            v-else
            v-model="singleDate"
            @update:model-value="(value) => updateSingleDate(value)"
            initial-focus />
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>