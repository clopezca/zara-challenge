import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('should render the error message', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
