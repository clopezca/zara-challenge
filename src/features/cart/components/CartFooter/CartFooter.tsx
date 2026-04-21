import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../../../../utils/utils'
import { ROUTES } from '../../../../routes'

import styles from './CartFooter.module.scss'

interface CartFooterProps {
  total: number
  isEmpty: boolean
}

const CartFooter = ({ total, isEmpty }: CartFooterProps) => {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer} aria-label="Cart summary">
      <button
        className={`${styles.continueShopping} ${!isEmpty ? styles.hideOnMobile : ''}`}
        onClick={() => navigate(ROUTES.HOME)}
      >
        continue shopping
      </button>
      {!isEmpty && (
        <>
          <div className={styles.totalRow} aria-hidden="true">
            <span className={styles.totalLabel}>total</span>
            <span className={styles.totalPrice}>{formatPrice(total)}</span>
          </div>
          <div className={styles.actionsRow} aria-hidden="true">
            <button className={styles.continueShopping} onClick={() => navigate(ROUTES.HOME)}>
              continue shopping
            </button>
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
