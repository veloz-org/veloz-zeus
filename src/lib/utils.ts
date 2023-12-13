import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format number to 100, 10k, 1M, 1B, 1T, etc
export function formatNumber(number: number) {
  // International number formatting
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

// format number to 100,000, 10,000,000, 1,000,000,000, etc
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
