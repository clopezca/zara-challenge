import { useNavigate } from 'react-router-dom'

import arrowleft from '../../assets/arrow-left.svg'

import styles from './BackButton.module.scss'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <img src={arrowleft} alt="back arrow" aria-hidden="true" />
      Back
    </button>
  )
}

export default BackButton
