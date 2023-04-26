import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]): string => {
  return twMerge(clsx(...classes));
};
