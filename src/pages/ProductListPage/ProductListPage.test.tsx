import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as useProductsHook from '../../features/products/hooks/useProducts'
import ProductListPage from './ProductListPage'
import { LoadingProvider } from '../../context/loading/LoadingProvider'

vi.mock('../../features/products/hooks/useProducts')

const mockProducts = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    basePrice: 1329,
    imageUrl: 'http://example.com/image.webp',
  },
]

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LoadingProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </LoadingProvider>
)

describe('ProductListPage', () => {
  it('should render error message when there is an error', () => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [],
      error: 'API error',
    })

    render(<ProductListPage />, { wrapper })

    expect(screen.getByRole('alert')).toHaveTextContent('API error')
  })

  it('should render products when loaded', () => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: mockProducts,
      error: null,
    })

    render(<ProductListPage />, { wrapper })

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render search input when products are loaded', () => {
    vi.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: mockProducts,
      error: null,
    })

    render(<ProductListPage />, { wrapper })

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })
})
