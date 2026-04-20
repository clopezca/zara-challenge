import { render, screen, act } from '@testing-library/react'
import { CartProvider } from './CartProvider'
import { useCart } from './useCart'

const mockCartItem = {
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
  const { items, addItem, removeItem, totalCount } = useCart()
  return (
    <div>
      <span>{totalCount}</span>
      <button onClick={() => addItem(mockCartItem)}>add</button>
      <button onClick={() => removeItem(mockCartItem.id)}>remove</button>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
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

    expect(screen.getByText('0')).toBeInTheDocument()
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
    expect(screen.getByText('1')).toBeInTheDocument()
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
    expect(screen.getByText('0')).toBeInTheDocument()
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
})
