<script setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { computed, ref, watch } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { DATE_PICKER_PRESETS } from '@/constants';

const props = defineProps({
  column: Object,
  setDateDefault: Boolean
});

const emit = defineEmits(['reset']);
const items = [
  { value: DATE_PICKER_PRESETS.onlyStartDay, label: 'Begin at', isDateRange: false },
  { value: DATE_PICKER_PRESETS.onlyEndDay, label: 'Finish at', isDateRange: false },
  { value: DATE_PICKER_PRESETS.rangeDate, label: 'Custom range day', isDateRange: true }
];

const selectDefault = ref(items[2]);
const itemSelected = computed(() => {
  if (props.setDateDefault) {
    return items[2];
  }
  return selectDefault.value;
});


const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
});
const endDate = new Date(new Date().getTime());
const dateRange = ref({
  start: props.column.getFilterValue()[0],
  end: props.column.getFilterValue()[1]
});
const singleDate = ref();

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

watch(() => props.column.getFilterValue(), newVal => {
  dateRange.value = { start: newVal[0], end: newVal[1] };
});

const handleSelectFilterDate = (value) => {
  selectDefault.value = items.find(option => option.value.toString() === value);
  emit('reset', false);
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
          :model-value="itemSelected.value.toString()"
          @update:model-value="handleSelectFilterDate"
        >
          <SelectTrigger>
            <SelectValue :placeholder="itemSelected.label || 'Select the filter time'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in items"
              :key="item.value"
              :value="item.value.toString()"
            >
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
            initial-focus
          />
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>