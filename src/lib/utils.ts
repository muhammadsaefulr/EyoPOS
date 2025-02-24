import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateHexId7 = () => {
  return Math.floor(Math.random() * 0x10000000) // 0x10000000 agar bisa dapat 7 digit
    .toString(16)
    .padStart(7, "0");
};