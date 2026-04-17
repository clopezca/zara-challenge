import ProductGrid from '../../features/products/components/ProductGrid/ProductGrid'
import { useProducts } from '../../features/products/hooks/useProducts'

import styles from './ProductListPage.module.scss'

const ProductListPage = () => {
  const { products, isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.page}>
      <ProductGrid products={products} />
    </main>
  )
}

export default ProductListPage
