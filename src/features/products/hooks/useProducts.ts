import { useEffect, useState } from 'react'
import { getProducts } from '../../../services/products.service'
import type { Product } from '../../../types/product.types'
import { useLoading } from '../../../context/loading/useLoading'

const MIN_SEARCH_LENGTH = 3

interface UseProductsResult {
  products: Product[]
  error: string | null
}

export const useProducts = (search?: string): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    if (search && search.length < MIN_SEARCH_LENGTH) {
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getProducts(search, controller.signal)
        setProducts(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [search, setIsLoading])

  return { products, error }
}
