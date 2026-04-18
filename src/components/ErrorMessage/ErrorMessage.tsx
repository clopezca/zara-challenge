import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default ErrorMessage
