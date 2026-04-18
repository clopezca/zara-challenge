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
    <article className={styles.card} onClick={() => navigate(`/phone/${product.id}`)}>
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className={styles.info}>
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
