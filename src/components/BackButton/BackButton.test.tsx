import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import BackButton from './BackButton'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const mockNavigate = vi.fn()

describe('BackButton', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    )
  })

  it('should render the button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should navigate back when clicked', () => {
    fireEvent.click(screen.getByRole('button'))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
