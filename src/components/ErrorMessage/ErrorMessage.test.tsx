import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('should render the error message', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })
})
