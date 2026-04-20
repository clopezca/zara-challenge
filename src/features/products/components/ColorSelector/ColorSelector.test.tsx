import { render, screen, fireEvent } from '@testing-library/react'
import ColorSelector from './ColorSelector'

const mockOptions = [
  { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'http://example.com/black.webp' },
  { name: 'Titanium Blue', hexCode: '#0000FF', imageUrl: 'http://example.com/blue.webp' },
]

describe('ColorSelector', () => {
  it('should render all color options', () => {
    render(<ColorSelector options={mockOptions} selected={null} onSelect={() => {}} />)

    expect(screen.getByLabelText('Titanium Black')).toBeInTheDocument()
    expect(screen.getByLabelText('Titanium Blue')).toBeInTheDocument()
  })

  it('should call onSelect when clicking a color', () => {
    const mockOnSelect = vi.fn()
    render(<ColorSelector options={mockOptions} selected={null} onSelect={mockOnSelect} />)

    fireEvent.click(screen.getByLabelText('Titanium Black'))
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0])
  })

  it('should show selected color name', () => {
    render(<ColorSelector options={mockOptions} selected={mockOptions[0]} onSelect={() => {}} />)

    expect(screen.getByText('Titanium Black')).toBeInTheDocument()
  })

  it('should mark selected color', () => {
    render(<ColorSelector options={mockOptions} selected={mockOptions[0]} onSelect={() => {}} />)
    const button = screen.getByLabelText('Titanium Black')

    expect(button?.className).toContain('selected')
  })
})
