import type { Phone } from '../types/phone.types'
import { deduplicateById } from '../utils/utils'
import { apiClient } from './api.client'

const PHONES_LIMIT = 20

export const getPhones = async (search?: string): Promise<Phone[]> => {
  const params = new URLSearchParams()
  params.set('limit', String(PHONES_LIMIT))

  if (search) params.set('search', search)

  const phones = await apiClient<Phone[]>(`/products?${params.toString()}`)

  return deduplicateById(phones)
}
