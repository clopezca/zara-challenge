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

    expect(screen.getByRole('button', { name: '256 GB' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '512 GB' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1 TB' })).toBeInTheDocument()
  })

  it('should call onSelect when clicking an option', () => {
    const mockOnSelect = vi.fn()

    render(<StorageSelector options={mockOptions} selected={null} onSelect={mockOnSelect} />)

    fireEvent.click(screen.getByRole('button', { name: '256 GB' }))

    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0])
  })

  it('should mark selected option', () => {
    render(<StorageSelector options={mockOptions} selected={mockOptions[0]} onSelect={() => {}} />)

    const button = screen.getByRole('button', { name: '256 GB' })
    expect(button?.className).toContain('selected')
  })
})
