import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import ProductCard from './ProductCard'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const mockProduct = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  imageUrl:
    'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
}

describe('ProductCard', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )
  })

  it('should render the product image', () => {
    expect(screen.getByAltText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render the product brand', () => {
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('should render the product name', () => {
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render the product price', () => {
    expect(screen.getByText('1329 EUR')).toBeInTheDocument()
  })

  it('should navigate to product detail on click', () => {
    cleanup()

    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('article'))

    expect(mockNavigate).toHaveBeenCalledWith('/phone/SMG-S24U')
  })
})
