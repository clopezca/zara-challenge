import { useEffect, useState } from 'react'
import { getProducts } from '../../../services/products.service'
import type { Product } from '../../../types/product.types'
import { useLoading } from '../../../context/loading/useLoading'

const MIN_SEARCH_LENGTH = 3
const MIN_LOADING_TIME = 1200
let isFirstLoad = true

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

        const minTime = isFirstLoad ? MIN_LOADING_TIME : 0

        const dataPromise = getProducts(search, controller.signal)
        await new Promise((resolve) => setTimeout(resolve, minTime))
        isFirstLoad = false
        const data = await dataPromise

        setProducts(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(
          err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [search, setIsLoading])

  return { products, error }
}
