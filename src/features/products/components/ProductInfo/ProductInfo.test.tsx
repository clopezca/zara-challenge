import { render, screen, fireEvent } from '@testing-library/react'
import ProductInfo from './ProductInfo'
import { MemoryRouter } from 'react-router-dom'

const mockProduct = {
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
  storageOptions: [
    { capacity: '256 GB', price: 1229 },
    { capacity: '512 GB', price: 1329 },
  ],
  similarProducts: [],
}

describe('ProductInfo', () => {
  it('should render product name', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should show "From X EUR" when no storage selected', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('From 1329 EUR')).toBeInTheDocument()
  })

  it('should show storage price when storage is selected', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={() => {}} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('256 GB'))

    expect(screen.getByText('1229 EUR')).toBeInTheDocument()
  })

  it('should disable button when no color and storage selected', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
  })

  it('should enable button when color and storage are selected', () => {
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={() => {}} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByLabelText('Titanium Black'))
    fireEvent.click(screen.getByText('256 GB'))

    expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled()
  })

  it('should call onAddToCart when button is clicked', () => {
    const mockOnAddToCart = vi.fn()
    render(
      <MemoryRouter>
        <ProductInfo product={mockProduct} onAddToCart={mockOnAddToCart} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByLabelText('Titanium Black'))
    fireEvent.click(screen.getByText('256 GB'))
    fireEvent.click(screen.getByRole('button', { name: /add galaxy s24 ultra to cart/i }))

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
  })
})
