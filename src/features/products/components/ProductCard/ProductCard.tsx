import { formatPrice } from '../../../../utils/utils'
import type { Product } from '../../../../types/product.types'

import styles from './ProductCard.module.scss'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate()

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/phone/${product.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`${product.brand} ${product.name}, ${formatPrice(product.basePrice)}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/phone/${product.id}`)}
    >
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt="" aria-hidden="true" />
      </div>

      <div className={styles.info} aria-hidden="true">
        <div className={styles.brandName}>
          <span className={styles.brand}>{product.brand}</span>
          <span className={styles.name}>{product.name}</span>
        </div>
        <span className={styles.price}>{formatPrice(product.basePrice)}</span>
      </div>
    </article>
  )
}

export default ProductCard
