import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes'

import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <main className={`${styles.page} fadeIn`}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to={ROUTES.HOME} className={styles.button}>
        back to home
      </Link>
    </main>
  )
}

export default NotFoundPage
