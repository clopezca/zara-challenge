import { render, screen, act } from '@testing-library/react'
import { CartProvider } from './CartProvider'
import { useCart } from './useCart'

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

const TestComponent = () => {
  const { items, addItem, removeItem, totalCount, total } = useCart()
  return (
    <div>
      <span data-testid="count">{totalCount}</span>
      <span data-testid="total">{total}</span>
      <button onClick={() => addItem(mockCartItem)}>add</button>
      <button onClick={() => removeItem(mockCartItem.cartItemId)}>remove</button>
      {items.map((item) => (
        <div key={item.cartItemId}>{item.name}</div>
      ))}
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  it('should start with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByText('add').click()
    })

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByText('add').click()
    })
    act(() => {
      screen.getByText('remove').click()
    })

    expect(screen.queryByText('Galaxy S24 Ultra')).not.toBeInTheDocument()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should persist items to localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByText('add').click()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([mockCartItem]))
  })

  it('should throw error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow('useCart must be used within a CartProvider')
    consoleError.mockRestore()
  })

  it('should calculate total correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    act(() => {
      screen.getByText('add').click()
    })

    expect(screen.getByTestId('total')).toHaveTextContent('1229')
  })
})
