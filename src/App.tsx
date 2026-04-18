import AppRouter from './router'
import { LoadingProvider } from './context/loading/LoadingProvider'
import { useLoading } from './context/loading/useLoading'
import LoadingBar from './components/LoadingBar/LoadingBar'
import Navbar from './components/Navbar/Navbar'

const AppContent = () => {
  const { isLoading } = useLoading()

  return (
    <>
      <Navbar cartCount={0} />
      {isLoading && <LoadingBar />}
      <AppRouter />
    </>
  )
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  )
}

export default App
