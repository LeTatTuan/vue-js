import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CHARACTER_FOR_PASSWORD } from '@/constants';

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

  startDate = new Date(startDate).setHours(0, 0, 0, 0) || new Date().setHours(0, 0, 0, 0);
  endDate = new Date(endDate).setHours(23, 59, 59, 1000) || new Date(startDate).setHours(23, 59, 59, 1000);

  if (typeof rowValue !== 'number') rowValue = new Date(rowValue).getTime();
  return rowValue >= startDate && rowValue <= endDate;
};

export const objectFilterFn = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId);
  const keys = Object.keys(cellValue);
  for (let key of keys) {
    const value = String(cellValue[key]).toLowerCase();
    if (value.includes(String(filterValue).toLowerCase())) {
      return true;
    }
  }

  return false;
};

export const getRandomString = (str, len) => {

  const pos1 = Math.floor(Math.random() * len);
  const pos2 = Math.floor(Math.random() * len);

  const start = Math.min(pos1, pos2);
  const end = Math.max(pos1, pos2);

  return str[start] + str[end];
};

export const shuffleString = (str) => {
  let arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
};

export const generateRandomPassword = () => {
  let password = '';
  Object.keys(CHARACTER_FOR_PASSWORD).forEach(key => {
    password += getRandomString(CHARACTER_FOR_PASSWORD[key], CHARACTER_FOR_PASSWORD[key].length);
  });
  return shuffleString(password);
};
