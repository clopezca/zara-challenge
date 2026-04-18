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
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={styles.results}>{formatResultsCount(resultsCount)}</span>
    </div>
  )
}

export default SearchInput
