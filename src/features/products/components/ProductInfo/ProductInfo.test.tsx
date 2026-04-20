import { render, screen, fireEvent } from '@testing-library/react'
import ProductInfo from './ProductInfo'

const mockColorOptions = [
  { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'http://example.com/black.webp' },
]

const mockStorageOptions = [
  { capacity: '256 GB', price: 1229 },
  { capacity: '512 GB', price: 1329 },
]

const defaultProps = {
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  colorOptions: mockColorOptions,
  storageOptions: mockStorageOptions,
  selectedColor: null,
  selectedStorage: null,
  onColorSelect: () => {},
  onStorageSelect: () => {},
  onAddToCart: () => {},
}

describe('ProductInfo', () => {
  it('should render product name', () => {
    render(<ProductInfo {...defaultProps} />)

    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('should show "From X EUR" when no storage selected', () => {
    render(<ProductInfo {...defaultProps} />)

    expect(screen.getByText('From 1329 EUR')).toBeInTheDocument()
  })

  it('should show storage price when storage is selected', () => {
    render(<ProductInfo {...defaultProps} selectedStorage={mockStorageOptions[0]} />)

    expect(screen.getByText('1229 EUR')).toBeInTheDocument()
  })

  it('should disable button when no color and storage selected', () => {
    render(<ProductInfo {...defaultProps} />)

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
  })

  it('should enable button when color and storage are selected', () => {
    render(
      <ProductInfo
        {...defaultProps}
        selectedColor={mockColorOptions[0]}
        selectedStorage={mockStorageOptions[0]}
      />
    )
    expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled()
  })

  it('should call onAddToCart when button is clicked', () => {
    const mockOnAddToCart = vi.fn()
    render(
      <ProductInfo
        {...defaultProps}
        selectedColor={mockColorOptions[0]}
        selectedStorage={mockStorageOptions[0]}
        onAddToCart={mockOnAddToCart}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
  })
})
