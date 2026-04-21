import * as apiClientModule from './api.client'
import { getProducts, getProductById } from './products.service'

vi.mock('./api.client')

const mockProducts = [
  {
    id: 'OPP-A60',
    brand: 'OPPO',
    name: 'A60',
    basePrice: 179,
    imageUrl: 'http://example.com/1.webp',
  },
  {
    id: 'MTE-EDGE50PRO',
    brand: 'Motorola',
    name: 'edge 50 Pro',
    basePrice: 649,
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTE-EDGE50PRO-negro.webp',
  },
  {
    id: 'OPP-A60',
    brand: 'OPPO',
    name: 'A60',
    basePrice: 179,
    imageUrl: 'http://example.com/1.webp',
  },
]

const mockProductDetail = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  description: 'A great phone',
  rating: 4.6,
  specs: {
    screen: '6.8"',
    resolution: '3120 x 1440',
    processor: 'Snapdragon 8 Gen 3',
    mainCamera: '200 MP',
    selfieCamera: '12 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz',
  },
  colorOptions: [],
  storageOptions: [],
  similarProducts: [
    {
      id: 'OPP-A60',
      brand: 'OPPO',
      name: 'A60',
      basePrice: 179,
      imageUrl: 'http://example.com/1.webp',
    },
    {
      id: 'OPP-A60',
      brand: 'OPPO',
      name: 'A60',
      basePrice: 179,
      imageUrl: 'http://example.com/1.webp',
    },
  ],
}

describe('products.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProducts', () => {
    it('should call apiClient with correct endpoint', async () => {
      vi.spyOn(apiClientModule, 'apiClient').mockResolvedValue([])

      await getProducts()

      expect(apiClientModule.apiClient).toHaveBeenCalledWith('/products?limit=20', undefined)
    })

    it('should call apiClient with search param', async () => {
      vi.spyOn(apiClientModule, 'apiClient').mockResolvedValue([])

      await getProducts('samsung')

      expect(apiClientModule.apiClient).toHaveBeenCalledWith(
        '/products?limit=20&search=samsung',
        undefined
      )
    })

    it('should deduplicate products', async () => {
      vi.spyOn(apiClientModule, 'apiClient').mockResolvedValue(mockProducts)

      const result = await getProducts()

      expect(result).toHaveLength(2)
    })
  })

  describe('getProductById', () => {
    it('should call apiClient with correct endpoint', async () => {
      vi.spyOn(apiClientModule, 'apiClient').mockResolvedValue(mockProductDetail)

      await getProductById('SMG-S24U')

      expect(apiClientModule.apiClient).toHaveBeenCalledWith('/products/SMG-S24U', undefined)
    })

    it('should deduplicate similar products', async () => {
      vi.spyOn(apiClientModule, 'apiClient').mockResolvedValue(mockProductDetail)

      const result = await getProductById('SMG-S24U')

      expect(result.similarProducts).toHaveLength(1)
    })
  })
})
