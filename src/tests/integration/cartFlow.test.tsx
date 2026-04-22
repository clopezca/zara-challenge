import { useEffect } from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { CartProvider } from '../../context/cart/CartProvider'
import { LoadingProvider } from '../../context/loading/LoadingProvider'
import { useCart } from '../../context/cart/useCart'

import Navbar from '../../components/Navbar/Navbar'
import CartPage from '../../pages/CartPage/CartPage'

const mockCartItem = {
  cartItemId: '123abc',
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  imageUrl: 'http://example.com/image.webp',
  selectedColor: {
    name: 'Titanium Black',
    hexCode: '#000000',
    imageUrl: 'http://example.com/black.webp',
  },
  selectedStorage: { capacity: '256 GB', price: 1229 },
  price: 1229,
}

const mockCartItem2 = {
  cartItemId: '456def',
  id: 'APL-I15PM',
  brand: 'Apple',
  name: 'iPhone 15 Pro Max',
  imageUrl: 'http://example.com/image2.webp',
  selectedColor: {
    name: 'Midnight',
    hexCode: '#000000',
    imageUrl: 'http://example.com/midnight.webp',
  },
  selectedStorage: { capacity: '256 GB', price: 1319 },
  price: 1319,
}

const CartSetup = ({ children }: { children: React.ReactNode }) => {
  const { addItem } = useCart()

  useEffect(() => {
    addItem(mockCartItem)
  }, [])

  return <>{children}</>
}

const Layout = () => {
  const { totalCount } = useCart()
  return (
    <>
      <Navbar cartCount={totalCount} />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

const CartSetupTwoItems = ({ children }: { children: React.ReactNode }) => {
  const { addItem } = useCart()

  useEffect(() => {
    addItem(mockCartItem)
    addItem(mockCartItem2)
  }, [])

  return <>{children}</>
}

const AppWrapperWithTwoItems = () => (
  <CartProvider>
    <LoadingProvider>
      <MemoryRouter initialEntries={['/cart']}>
        <CartSetupTwoItems>
          <Layout />
        </CartSetupTwoItems>
      </MemoryRouter>
    </LoadingProvider>
  </CartProvider>
)

const AppWrapper = () => (
  <CartProvider>
    <LoadingProvider>
      <MemoryRouter initialEntries={['/cart']}>
        <CartSetup>
          <Layout />
        </CartSetup>
      </MemoryRouter>
    </LoadingProvider>
  </CartProvider>
)

describe('Cart flow integration', () => {
  it('should show cart with 1 item', async () => {
    render(<AppWrapper />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /cart \(1\)/i })).toBeInTheDocument()
      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    })
  })

  it('should show cart (0) and remove product after removing item', async () => {
    render(<AppWrapper />)

    await waitFor(() => {
      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: /cart \(0\)/i })).toBeInTheDocument()
        expect(screen.queryByText('Galaxy S24 Ultra')).not.toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('should not show pay button when cart is empty', async () => {
    render(<AppWrapper />)

    await waitFor(() => {
      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(
      () => {
        expect(screen.queryByRole('button', { name: /pay now/i })).not.toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('should update total when item is removed', async () => {
    render(<AppWrapperWithTwoItems />)

    await waitFor(() => {
      expect(screen.getByText('1229 EUR')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(
      () => {
        expect(screen.getByText('1319 EUR')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('should update navbar cart count when item is removed', async () => {
    render(<AppWrapper />)

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /cart, 1 item/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

    await waitFor(
      () => {
        expect(screen.getByRole('link', { name: /cart, 0 items/i })).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })
})
