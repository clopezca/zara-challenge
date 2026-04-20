import { render, screen, fireEvent } from '@testing-library/react'
import StorageSelector from './StorageSelector'

const mockOptions = [
  { capacity: '256 GB', price: 1229 },
  { capacity: '512 GB', price: 1329 },
  { capacity: '1 TB', price: 1529 },
]

describe('StorageSelector', () => {
  it('should render all storage options', () => {
    render(<StorageSelector options={mockOptions} selected={null} onSelect={() => {}} />)

    expect(screen.getByText('256 GB')).toBeInTheDocument()
    expect(screen.getByText('512 GB')).toBeInTheDocument()
    expect(screen.getByText('1 TB')).toBeInTheDocument()
  })

  it('should call onSelect when clicking an option', () => {
    const mockOnSelect = vi.fn()

    render(<StorageSelector options={mockOptions} selected={null} onSelect={mockOnSelect} />)
    fireEvent.click(screen.getByText('256 GB'))

    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0])
  })

  it('should mark selected option', () => {
    render(<StorageSelector options={mockOptions} selected={mockOptions[0]} onSelect={() => {}} />)

    const button = screen.getByText('256 GB').closest('button')

    expect(button?.className).toContain('selected')
  })
})
