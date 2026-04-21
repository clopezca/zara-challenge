import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const mockNavigate = vi.fn()

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
  })

  it('should render 404', () => {
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('should render page not found message', () => {
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  it('should navigate to home when button is clicked', () => {
    fireEvent.click(screen.getByRole('button'))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
