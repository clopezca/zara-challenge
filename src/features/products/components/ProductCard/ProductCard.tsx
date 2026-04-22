import { Link } from 'react-router-dom'

import { getProductDetailRoute } from '../../../../routes'
import { formatPrice } from '../../../../utils/utils'
import type { Product } from '../../../../types/product.types'

import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <Link
        to={getProductDetailRoute(product.id)}
        className={styles.cardLink}
        aria-label={`${product.brand} ${product.name}, ${formatPrice(product.basePrice)}`}
      >
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl}
            alt=""
            aria-hidden="true"
            fetchPriority={priority ? 'high' : 'auto'}
            width={199}
            height={199}
          />
        </div>

        <div className={styles.info} aria-hidden="true">
          <div className={styles.brandName}>
            <span className={styles.brand}>{product.brand}</span>
            <span className={styles.name}>{product.name}</span>
          </div>
          <span className={styles.price}>{formatPrice(product.basePrice)}</span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
