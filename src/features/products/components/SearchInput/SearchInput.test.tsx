import { fireEvent, render, screen } from '@testing-library/react'
import SearchInput from './SearchInput'

describe('SearchInput', () => {
  it('should render the input with placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} resultsCount={0} />)

    expect(screen.getByPlaceholderText('Search for a smartphone...')).toBeInTheDocument()
  })

  it('should call onChange when user types', () => {
    const mockOnChange = vi.fn()

    render(<SearchInput value="" onChange={mockOnChange} resultsCount={0} />)

    fireEvent.change(screen.getByPlaceholderText('Search for a smartphone...'), {
      target: { value: 'samsung' },
    })

    expect(mockOnChange).toHaveBeenCalledWith('samsung')
  })

  it('should display results count', () => {
    render(<SearchInput value="" onChange={() => {}} resultsCount={20} />)

    expect(screen.getByText('20 RESULTS')).toBeInTheDocument()
  })

  it('should display singular result', () => {
    render(<SearchInput value="" onChange={() => {}} resultsCount={1} />)

    expect(screen.getByText('1 RESULT')).toBeInTheDocument()
  })

  it('should clear search when X button is clicked', () => {
    const mockOnChange = vi.fn()
    render(<SearchInput value="samsung" onChange={mockOnChange} resultsCount={5} />)

    fireEvent.click(screen.getByRole('button', { name: /clear search/i }))

    expect(mockOnChange).toHaveBeenCalledWith('')
  })
})
