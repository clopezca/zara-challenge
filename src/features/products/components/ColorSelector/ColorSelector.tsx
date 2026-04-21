import type { ColorOption } from '../../../../types/product.types'
import styles from './ColorSelector.module.scss'

interface ColorSelectorProps {
  options: ColorOption[]
  selected: ColorOption | null
  onSelect: (color: ColorOption) => void
}

const ColorSelector = ({ options, selected, onSelect }: ColorSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label} id="color-label">
        Color. Pick your favourite.
      </p>
      <div className={styles.options} role="group" aria-labelledby="color-label">
        {options.map((option) => (
          <button
            key={option.name}
            className={`${styles.swatch} ${selected?.name === option.name ? styles.selected : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onSelect(option)}
            aria-label={option.name}
            aria-pressed={selected?.name === option.name}
          />
        ))}
      </div>
      {selected && (
        <p className={styles.colorName} aria-live="polite">
          {selected.name}
        </p>
      )}
    </div>
  )
}

export default ColorSelector
