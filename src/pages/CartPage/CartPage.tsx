import { useCart } from '../../context/cart/useCart'
import CartFooter from '../../features/cart/components/CartFooter/CartFooter'
import CartItem from '../../features/cart/components/CartItem/CartItem'

import styles from './CartPage.module.scss'

const CartPage = () => {
  const { items, removeItem, totalCount, total } = useCart()

  return (
    <main className={`${styles.page} fadeIn`}>
      <h1 className={styles.title}>cart ({totalCount})</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem key={item.cartItemId} item={item} onRemove={removeItem} />
        ))}
      </ul>
      <CartFooter total={total} isEmpty={totalCount === 0} />
    </main>
  )
}

export default CartPage
