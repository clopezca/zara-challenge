import { render } from '@testing-library/react'
import LoadingBar from './LoadingBar'

describe('LoadingBar', () => {
  it('should render without crashing', () => {
    const { container } = render(<LoadingBar />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
