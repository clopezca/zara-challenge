import { useState } from 'react'

import styles from './LoadingBar.module.scss'

const LoadingBar = () => {
  const [phase, setPhase] = useState<'progress' | 'shimmer'>('progress')

  return (
    <div
      className={`${styles.loadingBar} ${phase === 'shimmer' ? styles.shimmer : ''}`}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
      onAnimationEnd={() => setPhase('shimmer')}
    />
  )
}

export default LoadingBar
