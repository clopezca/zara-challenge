export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
} as const

export const getProductDetailRoute = (id: string) => `/product/${id}`
