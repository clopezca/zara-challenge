import { describe, expect, it } from 'vitest'
import { deduplicateById } from './utils'

describe('deduplicateById', () => {
  it('should remove duplicate item by id', () => {
    const items = [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
      },
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
      },
      {
        id: 'GPX-8A',
        brand: 'Google',
        name: 'Pixel 8a',
        basePrice: 459,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
      },
    ]

    const result = deduplicateById(items)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('SMG-S24U')
    expect(result[1].id).toBe('GPX-8A')
  })

  it('should return the same array when there are no duplicates', () => {
    const items = [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
      },
      {
        id: 'GPX-8A',
        brand: 'Google',
        name: 'Pixel 8a',
        basePrice: 459,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
      },
    ]

    const result = deduplicateById(items)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('SMG-S24U')
    expect(result[1].id).toBe('GPX-8A')
  })

  it('should return an empty array when given an empty array', () => {
    const result = deduplicateById([])

    expect(result).toHaveLength(0)
  })

  it('should exclude items without id', () => {
    const items = [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
      },
      {
        id: '',
        brand: 'Google',
        name: 'Pixel 8a',
        basePrice: 459,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
      },
    ]

    const result = deduplicateById(items)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('SMG-S24U')
  })
})
