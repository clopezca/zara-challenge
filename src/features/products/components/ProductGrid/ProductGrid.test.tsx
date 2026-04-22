import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductGrid from './ProductGrid'

const mockProducts = [
  {
    id: 'SMG-A25',
    brand: 'Samsung',
    name: 'Galaxy A25 5G',
    basePrice: 239,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp',
  },
  {
    id: 'GPX-8A',
    brand: 'Google',
    name: 'Pixel 8a',
    basePrice: 459,
    imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
  },
]

describe('ProductGrid', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ProductGrid products={mockProducts} />
      </MemoryRouter>
    )
  })

  it('should render all products', () => {
    expect(screen.getByRole('link', { name: /samsung galaxy a25 5g/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /google pixel 8a/i })).toBeInTheDocument()
  })

  it('should render correct number of products', () => {
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('should render empty grid when no products', () => {
    cleanup()

    render(
      <MemoryRouter>
        <ProductGrid products={[]} />
      </MemoryRouter>
    )

    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })
})
