import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateOTP() { 
  
  // Declare a digits variable 
  // which stores all digits  
  let digits = '0123456789'; 
  let OTP = ''; 
  let len = digits.length 
  for (let i = 0; i < 4; i++) { 
      OTP += digits[Math.floor(Math.random() * len)]; 
  } 
   
  return OTP; 
} 
