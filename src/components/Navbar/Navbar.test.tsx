import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import fullBagIcon from '../../assets/full-bag-icon.svg'

describe('Navbar', () => {
  it('should render the logo', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByAltText('MBST logo')).toBeInTheDocument()
  })

  it('should render the cart icon', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart')
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

    expect(screen.getByRole('link', { name: 'Go to home' })).toHaveAttribute('href', '/')
  })

  it('should have a link to cart', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart')
  })

  it('should render full cart icon when cartCount is greater than 0', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={3} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /cart, 3 items/i })).toBeInTheDocument()
  })

  it('should render full bag icon when cartCount is greater than 0', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar cartCount={3} />
      </MemoryRouter>
    )
    const img = container.querySelector('a[href="/cart"] img')
    expect(img).toHaveAttribute('src', fullBagIcon)
  })

  it('should render singular item when cartCount is 1', () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={1} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Cart, 1 item' })).toBeInTheDocument()
  })
})
