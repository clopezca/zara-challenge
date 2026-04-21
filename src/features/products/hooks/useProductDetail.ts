import { useEffect, useState } from 'react'
import type { ProductDetail } from '../../../types/product.types'
import { useLoading } from '../../../context/loading/useLoading'
import { getProductById } from '../../../services/products.service'

interface UseProductDetailResult {
  product: ProductDetail | null
  error: string | null
}

export const useProductDetail = (id: string): UseProductDetailResult => {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const controller = new AbortController()

    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getProductById(id, controller.signal)
        setProduct(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(
          err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()

    return () => controller.abort()
  }, [id, setIsLoading])

  return { product, error }
}
