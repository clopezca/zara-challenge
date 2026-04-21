import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import ProductListPage from './pages/ProductListPage/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import CartPage from './pages/CartPage/CartPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<ProductListPage />} />
      <Route path={ROUTES.PHONE_DETAIL} element={<ProductDetailPage />} />
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
