import { http, HttpResponse } from 'msw'

const mockProducts = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl: 'http://example.com/image.webp',
  },
  {
    id: 'APL-I15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    basePrice: 1319,
    imageUrl: 'http://example.com/image2.webp',
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
  colorOptions: [
    { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'http://example.com/black.webp' },
  ],
  storageOptions: [{ capacity: '256 GB', price: 1229 }],
  similarProducts: [],
}

export const handlers = [
  http.get('https://prueba-tecnica-api-tienda-moviles.onrender.com/products', () => {
    return HttpResponse.json(mockProducts)
  }),

  http.get('https://prueba-tecnica-api-tienda-moviles.onrender.com/products/:id', () => {
    return HttpResponse.json(mockProductDetail)
  }),
]
