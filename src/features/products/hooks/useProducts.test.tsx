import { renderHook, waitFor } from '@testing-library/react'
import * as productsService from '../../../services/products.service'
import { useProducts } from './useProducts'
import { LoadingProvider } from '../../../context/loading/LoadingProvider'

vi.mock('../../../services/products.service')

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LoadingProvider>{children}</LoadingProvider>
)

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and return products successfully', async () => {
    const mockProducts = [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
      },
    ]

    vi.spyOn(productsService, 'getProducts').mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts)
    })

    expect(productsService.getProducts).toHaveBeenCalledTimes(1)
  })

  it('should return an empty list when API returns no products', async () => {
    vi.spyOn(productsService, 'getProducts').mockResolvedValue([])

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(result.current.products).toEqual([])
      expect(result.current.error).toBeNull()
    })
  })

  it('should handle API errors and expose error state', async () => {
    vi.spyOn(productsService, 'getProducts').mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useProducts(), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toBe('API error')
      expect(result.current.products).toEqual([])
    })

    expect(productsService.getProducts).toHaveBeenCalledTimes(1)
  })

  it('should not call getProducts when search term is less than 3 characters', async () => {
    vi.spyOn(productsService, 'getProducts').mockResolvedValue([])

    const { result } = renderHook(() => useProducts('sa'), { wrapper })

    await waitFor(() => {
      expect(result.current.products).toEqual([])
    })

    expect(productsService.getProducts).not.toHaveBeenCalled()
  })

  it('should use the latest search term when search changes', async () => {
    vi.spyOn(productsService, 'getProducts').mockResolvedValue([])

    const { rerender } = renderHook(({ search }) => useProducts(search), {
      initialProps: { search: 'sam' },
      wrapper,
    })

    rerender({ search: 'samsung' })

    await waitFor(() => {
      expect(productsService.getProducts).toHaveBeenLastCalledWith(
        'samsung',
        expect.any(AbortSignal)
      )
    })
  })
})
