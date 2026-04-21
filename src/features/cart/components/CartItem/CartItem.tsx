import type { CartItem as CartItemType } from '../../../../context/cart/CartContext'
import { formatPrice } from '../../../../utils/utils'

import styles from './CartItem.module.scss'

interface CartItemProps {
  item: CartItemType
  onRemove: (cartItemId: string) => void
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </div>

      <div className={styles.info}>
        <div className={styles.topGroup}>
          <div className={styles.nameDetailsGroup}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.details}>
              {item.selectedStorage.capacity} | {item.selectedColor.name}
            </p>
          </div>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
        <button className={styles.remove} onClick={() => onRemove(item.cartItemId)}>
          remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
