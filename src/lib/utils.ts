import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHexId7 = () => {
  return Math.floor(Math.random() * 0x10000000) // 0x10000000 agar bisa dapat 7 digit
    .toString(16)
    .padStart(7, "0");
};

export const generateInvoiceNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = Math.floor(Math.random() * 100000)
    .toString(36)
    .toUpperCase();
  return `${date}-${randomStr}`;
};

export const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${timestamp}-${randomStr}`;
};

export const formatIDR = (inp: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(inp);
};
