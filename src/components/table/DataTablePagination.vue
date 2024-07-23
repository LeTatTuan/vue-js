<script setup>
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { ROWS_PER_PAGE } from '@/constants';

const props = defineProps({
  table: {
    type: Object,
    require: true
  }
});

const handlePagesizeChange = (event) => {
  props.table.setPageSize(event.target.value);
};
</script>

<template>
  <div class="flex items-center justify-end px-2 space-x-4 mt-8">
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
        <select
          v-model="table.getState().pagination.pageSize"
          class="h-8 w-[70px]"
          @change="handlePagesizeChange($event)"
        >
          <option v-for="pageSize in ROWS_PER_PAGE" :key="pageSize" :value="pageSize">
            {{ pageSize }}
          </option>
        </select>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2 page">
        <button
          :disabled="!table.getCanPreviousPage()"
          :class="{ 'opacity-50': !table.getCanPreviousPage() }"
          variant="outline"
          class="h-8 w-8 p-0"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft />
        </button>
        <button
          variant="outline"
          :disabled="!table.getCanPreviousPage()"
          class="h-8 w-8 p-0"
          :class="{ 'opacity-50': !table.getCanPreviousPage() }"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft />
        </button>

        <button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          :class="{ 'opacity-50': !table.getCanNextPage() }"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRight />
        </button>

        <button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          :class="{ 'opacity-50': !table.getCanNextPage() }"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight />
        </button>
      </div>
    </div>
  </div>
</template>
