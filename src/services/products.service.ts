import { deduplicateById } from '../utils/utils'
import { apiClient } from './api.client'

import type { Product, ProductDetail } from '../types/product.types'

const PRODUCTS_LIMIT = 20

export const getProducts = async (search?: string, signal?: AbortSignal): Promise<Product[]> => {
  const params = new URLSearchParams()
  params.set('limit', String(PRODUCTS_LIMIT))

  if (search) params.set('search', search)

  const products = await apiClient<Product[]>(`/products?${params.toString()}`, signal)

  return deduplicateById(products)
}

export const getProductById = async (id: string, signal?: AbortSignal): Promise<ProductDetail> => {
  const data = await apiClient<ProductDetail>(`/products/${id}`, signal)
  return {
    ...data,
    similarProducts: deduplicateById((await data).similarProducts),
  }
}
