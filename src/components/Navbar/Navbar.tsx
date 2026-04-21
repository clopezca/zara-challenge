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
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Link to={ROUTES.HOME} aria-label="Go to home">
        <img src={logo} alt="MBST logo" />
      </Link>

      <Link
        to={ROUTES.CART}
        className={styles.cartIcon}
        aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
      >
        <img src={cartCount > 0 ? fullBagIcon : emptyBagIcon} alt="" aria-hidden="true" />
        <span aria-hidden="true">{cartCount}</span>
      </Link>
    </nav>
  )
}

export default Navbar
