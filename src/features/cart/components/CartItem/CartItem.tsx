import { useState } from 'react'
import type { CartItem as CartItemType } from '../../../../context/cart/CartContext'
import { formatPrice } from '../../../../utils/utils'

import styles from './CartItem.module.scss'
import { Link } from 'react-router-dom'

interface CartItemProps {
  item: CartItemType
  onRemove: (cartItemId: string) => void
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(item.cartItemId)
    }, 300)
  }

  return (
    <li className={`${styles.item} ${isRemoving ? styles.fadeOut : ''}`}>
      <Link
        to={`/phone/${item.id}`}
        className={styles.wrapper}
        aria-label={`View details of ${item.name}`}
      >
        <img
          src={item.imageUrl}
          className={styles.image}
          alt=""
          aria-hidden="true"
          width={160}
          height={198}
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.topGroup}>
          <div className={styles.nameDetailsGroup}>
            <Link
              to={`/phone/${item.id}`}
              className={styles.name}
              aria-label={`View details of ${item.name}`}
            >
              {item.name}
            </Link>
            <p className={styles.details}>
              {item.selectedStorage.capacity} | {item.selectedColor.name}
            </p>
          </div>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
        <button
          className={styles.remove}
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
