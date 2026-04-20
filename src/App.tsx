import AppRouter from './router'
import { LoadingProvider } from './context/loading/LoadingProvider'
import { useLoading } from './context/loading/useLoading'
import LoadingBar from './components/LoadingBar/LoadingBar'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './context/cart/CartProvider'
import { useCart } from './context/cart/useCart'

const AppContent = () => {
  const { isLoading } = useLoading()
  const { totalCount } = useCart()

  return (
    <>
      <Navbar cartCount={totalCount} />
      {isLoading && <LoadingBar />}
      <AppRouter />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </CartProvider>
  )
}

export default App
