import styles from './LoadingBar.module.scss'

const LoadingBar = () => {
  return (
    <div
      className={styles.loadingBar}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
    ></div>
  )
}

export default LoadingBar
