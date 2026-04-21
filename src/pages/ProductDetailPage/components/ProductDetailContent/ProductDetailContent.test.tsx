import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../../../context/cart/CartProvider'
import ProductDetailContent from './ProductDetailContent'

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
  storageOptions: [{ capacity: '256 GB', price: 1229 }],
  similarProducts: [],
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </CartProvider>
)

describe('ProductDetailContent', () => {
  it('should render product name', () => {
    render(<ProductDetailContent product={mockProduct} />, { wrapper })

    expect(screen.getByRole('heading', { name: 'Galaxy S24 Ultra' })).toBeInTheDocument()
  })

  it('should render product image', () => {
    render(<ProductDetailContent product={mockProduct} />, { wrapper })

    expect(screen.getByAltText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should have add button disabled by default', () => {
    render(<ProductDetailContent product={mockProduct} />, { wrapper })

    expect(screen.getByRole('button', { name: /select color and storage/i })).toBeDisabled()
  })

  it('should enable add button when color and storage are selected', () => {
    render(<ProductDetailContent product={mockProduct} />, { wrapper })

    fireEvent.click(screen.getByLabelText('Titanium Black'))
    fireEvent.click(screen.getByText('256 GB'))

    expect(screen.getByRole('button', { name: /add galaxy s24 ultra to cart/i })).not.toBeDisabled()
  })
})
