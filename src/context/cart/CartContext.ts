import { createContext } from 'react'
import type { ColorOption, StorageOption } from '../../types/product.types'

export interface CartItem {
  id: string
  brand: string
  name: string
  imageUrl: string
  selectedColor: ColorOption
  selectedStorage: StorageOption
  price: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  totalCount: number
}

export const CartContext = createContext<CartContextType | null>(null)
