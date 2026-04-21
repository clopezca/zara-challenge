import { useNavigate } from 'react-router-dom'

import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <main className={`${styles.page} fadeIn`}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found</p>
      <button
        className={styles.button}
        onClick={() => navigate('/')}
        aria-label="Go back to home page"
      >
        Back to home
      </button>
    </main>
  )
}

export default NotFoundPage
