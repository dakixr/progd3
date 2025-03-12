import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatPostedDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export function getWorkModeIcon(workMode: string) {
  switch(workMode) {
    case 'remote':
      return '🏠'
    case 'hybrid':
      return '🏢/🏠'
    case 'onsite':
      return '🏢'
    default:
      return ''
  }
}
