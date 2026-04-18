import { render, screen } from '@testing-library/react'
import { LoadingProvider } from './LoadingProvider'
import { useLoading } from './useLoading'

const TestComponent = () => {
  const { isLoading, setIsLoading } = useLoading()
  return (
    <div>
      <span>{isLoading ? 'loading' : 'idle'}</span>
      <button onClick={() => setIsLoading(true)}>start</button>
      <button onClick={() => setIsLoading(false)}>stop</button>
    </div>
  )
}

describe('LoadingContext', () => {
  it('should have isLoading false by default', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    expect(screen.getByText('idle')).toBeInTheDocument()
  })

  it('should throw error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useLoading must be used within a LoadingProvider'
    )

    consoleError.mockRestore()
  })
})
