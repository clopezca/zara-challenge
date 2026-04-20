import { useState, useEffect } from 'react'
import { CartContext } from './CartContext'
import type { CartItem } from './CartContext'

const CART_STORAGE_KEY = 'cart'

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const total = items.reduce((acc, item) => acc + item.price, 0)

  const totalCount = items.length

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalCount, total }}>
      {children}
    </CartContext.Provider>
  )
}
