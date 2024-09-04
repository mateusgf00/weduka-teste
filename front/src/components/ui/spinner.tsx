import { ComponentProps } from "react";
import { cn } from "../../lib/utils";

export function Spinner() {
  return (
    <div 
      className={cn("animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-zinc-600 rounded-full dark:text-white")} 
      role="status"
      aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ButtonSpinner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div 
      className={cn("animate-spin inline-block size-6 border-[3px] border-current border-t-transparent rounded-full", className)} 
      role="status"
      aria-label="loading"
      {...props}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}