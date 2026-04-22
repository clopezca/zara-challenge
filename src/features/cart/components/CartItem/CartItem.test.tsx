import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartItem from './CartItem'

const mockItem = {
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

describe('CartItem', () => {
  it('should render product name', () => {
    render(
      <MemoryRouter>
        <CartItem item={mockItem} onRemove={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render storage and color', () => {
    render(
      <MemoryRouter>
        <CartItem item={mockItem} onRemove={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('256 GB | Titanium Black')).toBeInTheDocument()
  })

  it('should render price', () => {
    render(
      <MemoryRouter>
        <CartItem item={mockItem} onRemove={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('1229 EUR')).toBeInTheDocument()
  })

  it('should call onRemove with cartItemId when remove button is clicked', async () => {
    const mockOnRemove = vi.fn()
    render(
      <MemoryRouter>
        <CartItem item={mockItem} onRemove={mockOnRemove} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(() => {
      expect(mockOnRemove).toHaveBeenCalledWith('123abc')
    })
  })
})
