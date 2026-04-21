import type { Product } from '../../../../types/product.types'
import ProductCard from '../ProductCard/ProductCard'

import styles from './ProductGrid.module.scss'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const hasProducts = products.length > 0

  return (
    <ul className={`${styles.grid} ${hasProducts ? styles.visible : ''}`} aria-label="Product list">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index === 0} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
