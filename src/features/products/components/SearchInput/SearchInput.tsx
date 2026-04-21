import { formatResultsCount } from '../../../../utils/utils'
import styles from './SearchInput.module.scss'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
}

const SearchInput = ({ value, onChange, resultsCount }: SearchInputProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          id="search"
          name="search"
          type="search"
          aria-label="Search for a smartphone"
          className={styles.input}
          placeholder="Search for a smartphone..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <span className={styles.results} aria-live="polite" aria-atomic="true">
        {formatResultsCount(resultsCount)}
      </span>
    </div>
  )
}

export default SearchInput
