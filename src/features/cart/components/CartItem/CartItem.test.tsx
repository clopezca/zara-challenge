import { render, screen, fireEvent } from '@testing-library/react'
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
    render(<CartItem item={mockItem} onRemove={() => {}} />)

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should render storage and color', () => {
    render(<CartItem item={mockItem} onRemove={() => {}} />)

    expect(screen.getByText('256 GB | Titanium Black')).toBeInTheDocument()
  })

  it('should render price', () => {
    render(<CartItem item={mockItem} onRemove={() => {}} />)

    expect(screen.getByText('1229 EUR')).toBeInTheDocument()
  })

  it('should call onRemove with cartItemId when remove button is clicked', () => {
    const mockOnRemove = vi.fn()
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />)

    fireEvent.click(screen.getByRole('button'))

    expect(mockOnRemove).toHaveBeenCalledWith('123abc')
  })
})
