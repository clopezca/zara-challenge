import { createContext } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType | null>(null)
