import { render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import CartFooter from './CartFooter'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const mockNavigate = vi.fn()

describe('CartFooter', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('should show only continue shopping when cart is empty', () => {
    render(
      <MemoryRouter>
        <CartFooter total={0} isEmpty={true} />
      </MemoryRouter>
    )

    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument()
    expect(screen.queryByText(/pay/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })

  it('should show total and pay button when cart has items', () => {
    render(
      <MemoryRouter>
        <CartFooter total={1229} isEmpty={false} />
      </MemoryRouter>
    )

    expect(screen.getAllByText(/total/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText('1229 EUR').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/pay/i).length).toBeGreaterThan(0)
  })

  it('should navigate to home when continue shopping is clicked', () => {
    render(
      <MemoryRouter>
        <CartFooter total={0} isEmpty={true} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /continue shopping/i })).toHaveAttribute('href', '/')
  })
})
