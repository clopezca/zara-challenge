import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import { lazy, Suspense } from 'react'

const ProductListPage = lazy(() => import('./pages/ProductListPage/ProductListPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage/CartPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={ROUTES.HOME} element={<ProductListPage />} />
        <Route path={ROUTES.PHONE_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
