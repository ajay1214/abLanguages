import { type ClassValue, clsx } from "clsx"; // Importing types from clsx for class management
import { twMerge } from "tailwind-merge";    // Importing twMerge to combine Tailwind classes effectively

// Utility function `cn` to merge and combine class names using clsx and twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merges class names and resolves conflicts in Tailwind classes
}

// Function to create an absolute URL by appending a given path to the app's base URL
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`; // Combines base URL from env variables with the provided path
}
