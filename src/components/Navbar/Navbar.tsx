import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes'

import logo from '../../assets/logo.svg'
import emptyBagIcon from '../../assets/bag-icon.svg'
import fullBagIcon from '../../assets/full-bag-icon.svg'

import styles from './Navbar.module.scss'

interface NavbarProps {
  cartCount: number
}

const Navbar = ({ cartCount }: NavbarProps) => {
  const bagIcon = cartCount > 0 ? fullBagIcon : emptyBagIcon
  const cartLabel = `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Link to={ROUTES.HOME} aria-label="Go to home">
        <img src={logo} alt="MBST logo" />
      </Link>

      <Link to={ROUTES.CART} className={styles.cartIcon} aria-label={cartLabel}>
        <img src={bagIcon} alt="" aria-hidden="true" />
        <span aria-hidden="true">{cartCount}</span>
      </Link>
    </nav>
  )
}

export default Navbar
