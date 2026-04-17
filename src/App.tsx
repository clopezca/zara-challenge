import Navbar from './components/Navbar/Navbar'
import AppRouter from './router'

function App() {
  return (
    <>
      <Navbar cartCount={0} />
      <AppRouter />
    </>
  )
}

export default App
