import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date, addTime = null) => {
  // Get individual date components
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + (date.getMinutes() + (addTime ? 1 : 0))).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
};

export const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
}

export const formatString = (value) => {
  return value.toLocaleString('en-US');
}