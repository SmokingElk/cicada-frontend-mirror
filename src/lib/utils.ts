import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url?: string) {
  if (!url) return ''
  return url.startsWith('http') ? url : `http://${url}`
}