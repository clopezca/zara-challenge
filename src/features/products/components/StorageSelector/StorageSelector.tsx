import type { StorageOption } from '../../../../types/product.types'
import styles from './StorageSelector.module.scss'

interface StorageSelectorProps {
  options: StorageOption[]
  selected: StorageOption | null
  onSelect: (storage: StorageOption) => void
}

const StorageSelector = ({ options, selected, onSelect }: StorageSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label} id="storage-label">
        Storage. How much space do you need?
      </p>
      <div className={styles.options} role="group" aria-labelledby="storage-label">
        {options.map((option) => (
          <button
            key={option.capacity}
            className={`${styles.button} ${selected?.capacity === option.capacity ? styles.selected : ''}`}
            onClick={() => onSelect(option)}
            aria-pressed={selected?.capacity === option.capacity}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  )
}

export default StorageSelector
