import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPriceRange(min: number, max?: number) {
  if (typeof max === "number" && max > min) {
    return `${formatIdr(min)} - ${formatIdr(max)}`
  }
  return formatIdr(min)
}
