import { deduplicateById } from '../utils/utils'
import { apiClient } from './api.client'

import type { Product } from '../types/product.types'

const PRODUCTS_LIMIT = 20

export const getProducts = async (search?: string): Promise<Product[]> => {
  const params = new URLSearchParams()
  params.set('limit', String(PRODUCTS_LIMIT))

  if (search) params.set('search', search)

  const products = await apiClient<Product[]>(`/products?${params.toString()}`)

  return deduplicateById(products)
}
