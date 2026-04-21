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
    <nav className={styles.navbar}>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="Home" />
      </Link>

      <Link to={ROUTES.CART} className={styles.cartIcon}>
        <img src={cartCount > 0 ? fullBagIcon : emptyBagIcon} alt="Cart" />
        <span>{cartCount}</span>
      </Link>
    </nav>
  )
}

export default Navbar
