import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Phone list</div>} />
      <Route path="/phone/:id" element={<div>Phone detail</div>} />
      <Route path="/cart" element={<div>Cart</div>} />
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  )
}

export default AppRouter
