import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('should render the logo', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Home')).toBeInTheDocument()
  })

  it('should render the cart icon', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Cart')).toBeInTheDocument()
  })

  it('should display the cart count', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={3} />
      </MemoryRouter>
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should have a link to home', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('should have a link to cart', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart')
  })
})
