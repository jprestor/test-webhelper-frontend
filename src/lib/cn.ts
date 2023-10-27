import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function api(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
