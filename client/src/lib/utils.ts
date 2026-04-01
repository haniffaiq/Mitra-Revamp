import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MerchantPackage } from "@/data/merchants"

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

export function getPackagePriceRange(packages: MerchantPackage[]) {
  const prices = packages.map((pkg) => pkg.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}
