import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartPage from './CartPage'
import { CartProvider } from '../../context/cart/CartProvider'
import * as useCartHook from '../../context/cart/useCart'

vi.mock('../../context/cart/useCart')

const mockCartItem = {
  cartItemId: '123abc',
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  imageUrl: 'http://example.com/image.webp',
  selectedColor: {
    name: 'Titanium Black',
    hexCode: '#000000',
    imageUrl: 'http://example.com/black.webp',
  },
  selectedStorage: { capacity: '256 GB', price: 1229 },
  price: 1229,
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </CartProvider>
)

describe('CartPage', () => {
  it('should show Cart (0) when empty', () => {
    vi.spyOn(useCartHook, 'useCart').mockReturnValue({
      items: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      totalCount: 0,
      total: 0,
    })

    render(<CartPage />, { wrapper })

    expect(screen.getByText('cart (0)')).toBeInTheDocument()
  })

  it('should show items when cart has products', () => {
    vi.spyOn(useCartHook, 'useCart').mockReturnValue({
      items: [mockCartItem],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      totalCount: 1,
      total: 1229,
    })

    render(<CartPage />, { wrapper })

    expect(screen.getByText('cart (1)')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should call removeItem when remove button is clicked', async () => {
    const mockRemoveItem = vi.fn()
    vi.spyOn(useCartHook, 'useCart').mockReturnValue({
      items: [mockCartItem],
      addItem: vi.fn(),
      removeItem: mockRemoveItem,
      totalCount: 1,
      total: 1229,
    })

    render(<CartPage />, { wrapper })

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(
      () => {
        expect(mockRemoveItem).toHaveBeenCalledWith('123abc')
      },
      { timeout: 500 }
    )
  })
})
