import { Link } from 'react-router-dom'
import { formatPrice } from '../../../../utils/utils'
import { ROUTES } from '../../../../routes'

import styles from './CartFooter.module.scss'

interface CartFooterProps {
  total: number
  isEmpty: boolean
}

const CartFooter = ({ total, isEmpty }: CartFooterProps) => {
  return (
    <footer className={styles.footer} aria-label="Cart summary">
      <Link
        to={ROUTES.HOME}
        className={`${styles.continueShopping} ${!isEmpty ? styles.hideOnMobile : ''}`}
      >
        continue shopping
      </Link>
      {!isEmpty && (
        <>
          <div className={styles.totalRow} aria-hidden="true">
            <span className={styles.totalLabel}>total</span>
            <span className={styles.totalPrice}>{formatPrice(total)}</span>
          </div>
          <div className={styles.actionsRow} aria-hidden="true">
            <Link to={ROUTES.HOME} className={styles.continueShopping}>
              continue shopping
            </Link>
            <button className={styles.pay}>pay</button>
          </div>
          <div className={styles.rightGroup}>
            <div className={styles.totalGroup}>
              <span className={styles.totalLabel}>total</span>
              <span className={styles.totalPrice}>{formatPrice(total)}</span>
            </div>
            <button className={styles.pay} aria-label="Pay now">
              pay
            </button>
          </div>
        </>
      )}
    </footer>
  )
}

export default CartFooter
