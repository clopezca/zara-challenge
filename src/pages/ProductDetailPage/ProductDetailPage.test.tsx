import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { getProductDetailRoute, ROUTES } from '../../routes'
import { LoadingProvider } from '../../context/loading/LoadingProvider'
import { CartProvider } from '../../context/cart/CartProvider'
import * as useProductDetailHook from '../../features/products/hooks/useProductDetail'
import * as useCartHook from '../../context/cart/useCart'

import ProductDetailPage from './ProductDetailPage'

vi.mock('../../features/products/hooks/useProductDetail')

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <LoadingProvider>
      <MemoryRouter initialEntries={[getProductDetailRoute('SMG-S24U')]}>
        <Routes>
          <Route path={ROUTES.PRODUCT_DETAIL} element={children} />
        </Routes>
      </MemoryRouter>
    </LoadingProvider>
  </CartProvider>
)

const mockProduct = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  description:
    'El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.',
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

describe('ProductDetailPage', () => {
  it('should render error message when there is an error', () => {
    vi.spyOn(useProductDetailHook, 'useProductDetail').mockReturnValue({
      product: null,
      error: 'API error',
    })

    render(<ProductDetailPage />, { wrapper })

    expect(screen.getByRole('alert')).toHaveTextContent('API error')
  })

  it('should render nothing when product is null', () => {
    vi.spyOn(useProductDetailHook, 'useProductDetail').mockReturnValue({
      product: null,
      error: null,
    })

    const { container } = render(<ProductDetailPage />, { wrapper })

    expect(container).toBeEmptyDOMElement()
  })

  it('should render product name when product is loaded', () => {
    vi.spyOn(useProductDetailHook, 'useProductDetail').mockReturnValue({
      product: mockProduct,
      error: null,
    })

    render(<ProductDetailPage />, { wrapper })

    expect(screen.getByRole('heading', { name: 'Galaxy S24 Ultra' })).toBeInTheDocument()
  })

  it('should call addItem when add button is clicked', () => {
    const mockAddItem = vi.fn()
    vi.spyOn(useCartHook, 'useCart').mockReturnValue({
      items: [],
      addItem: mockAddItem,
      removeItem: vi.fn(),
      totalCount: 0,
      total: 0,
    })

    vi.spyOn(useProductDetailHook, 'useProductDetail').mockReturnValue({
      product: mockProduct,
      error: null,
    })

    render(<ProductDetailPage />, { wrapper })

    fireEvent.click(screen.getByLabelText('Titanium Black'))
    fireEvent.click(screen.getByRole('button', { name: '256 GB' }))
    fireEvent.click(screen.getByRole('button', { name: /add galaxy s24 ultra to cart/i }))

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'SMG-S24U',
        name: 'Galaxy S24 Ultra',
        price: 1229,
      })
    )
  })
})
