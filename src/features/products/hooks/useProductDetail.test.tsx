import { renderHook, waitFor } from '@testing-library/react'
import * as productsService from '../../../services/products.service'
import { LoadingProvider } from '../../../context/loading/LoadingProvider'
import { useProductDetail } from './useProductDetail'

vi.mock('../../../services/products.service.ts')

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LoadingProvider>{children}</LoadingProvider>
)

describe('useProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and return product detail successfully', async () => {
    const mockProduct = {
      id: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      description:
        'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.',
      basePrice: 1329,
      rating: 4.6,
      specs: {
        screen: '6.8" Dynamic AMOLED 2X',
        resolution: '3120 x 1440 pixels',
        processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core',
        mainCamera:
          '200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x3, OIS + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS',
        selfieCamera: '12 MP',
        battery: '5000 mAh',
        os: 'Android 14',
        screenRefreshRate: '120 Hz',
      },
      colorOptions: [],
      storageOptions: [],
      similarProducts: [],
    }

    vi.spyOn(productsService, 'getProductById').mockResolvedValue(mockProduct)

    const { result } = renderHook(() => useProductDetail('SMG-S24U'), { wrapper })

    await waitFor(() => {
      expect(result.current.product).toEqual(mockProduct)
    })

    expect(productsService.getProductById).toHaveBeenCalledWith('SMG-S24U', expect.any(AbortSignal))
  })

  it('should handle API errors', async () => {
    vi.spyOn(productsService, 'getProductById').mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useProductDetail('SMG-S24U'), { wrapper })

    await waitFor(() => {
      expect(result.current.error).toBe('API error')
    })
  })
})
