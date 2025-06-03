import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const isEmpty = (obj:Record<string, any>)=>{
  return Object.keys(obj).length;
} 