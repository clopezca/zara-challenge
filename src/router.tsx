import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import ProductListPage from './pages/ProductListPage/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<ProductListPage />} />
      <Route path={ROUTES.PHONE_DETAIL} element={<ProductDetailPage />} />
      <Route path={ROUTES.CART} element={<div>Cart</div>} />
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  )
}

export default AppRouter
