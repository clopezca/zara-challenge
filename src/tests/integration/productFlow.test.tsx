import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { CartProvider } from '../../context/cart/CartProvider'
import { LoadingProvider } from '../../context/loading/LoadingProvider'
import { useCart } from '../../context/cart/useCart'

import ProductListPage from '../../pages/ProductListPage/ProductListPage'
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage'
import Navbar from '../../components/Navbar/Navbar'

const Layout = () => {
  const { totalCount } = useCart()
  return (
    <>
      <Navbar cartCount={totalCount} />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  )
}

const AppWrapper = () => (
  <CartProvider>
    <LoadingProvider>
      <MemoryRouter initialEntries={['/']}>
        <Layout />
      </MemoryRouter>
    </LoadingProvider>
  </CartProvider>
)

describe('Product flow integration', () => {
  it('should navigate to product detail when clicking a product', async () => {
    render(<AppWrapper />)

    await waitFor(
      () => {
        expect(screen.getByRole('link', { name: /samsung galaxy s24 ultra/i })).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    fireEvent.click(screen.getByRole('link', { name: /samsung galaxy s24 ultra/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /galaxy s24 ultra/i })).toBeInTheDocument()
    })
  })

  it('should show cart count 1 after adding a product', async () => {
    render(<AppWrapper />)

    await waitFor(
      () => {
        expect(screen.getByRole('link', { name: /samsung galaxy s24 ultra/i })).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    fireEvent.click(screen.getByRole('link', { name: /samsung galaxy s24 ultra/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /galaxy s24 ultra/i })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText(/titanium black/i))
    fireEvent.click(screen.getByRole('button', { name: '256 GB' }))

    fireEvent.click(screen.getByRole('button', { name: /Add Galaxy S24 Ultra to cart/i }))

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /cart, 1 item/i })).toBeInTheDocument()
    })
  })
})
