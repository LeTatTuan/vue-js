import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date, addTime = null) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-4);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + (date.getMinutes() + (addTime ? 1 : 0))).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
};

export const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

export const formatString = (value) => {
  return value.toLocaleString('en-US');
};

export const valueUpdater = (updaterOrValue, ref) => {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue;
};

export const dateRangeFilterFn = (row, columnId, filterValue) => {
  let rowValue = row.getValue(columnId);
  let [startDate, endDate] = filterValue;

  startDate = new Date(startDate).setHours(0, 0, 0, 0);
  endDate = new Date(endDate).setHours(23, 59, 59, 1000) || new Date(startDate).setHours(23, 59, 59, 1000);

  if (typeof rowValue !== 'number') rowValue = new Date(rowValue).getTime();
  return rowValue >= startDate && rowValue <= endDate;
};
