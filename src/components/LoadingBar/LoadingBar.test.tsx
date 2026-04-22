import { render, screen } from '@testing-library/react'
import LoadingBar from './LoadingBar'

describe('LoadingBar', () => {
  it('should render without crashing', () => {
    render(<LoadingBar />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
