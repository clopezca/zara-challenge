import type { ColorOption, StorageOption } from '../../../../types/product.types'
import { formatPrice } from '../../../../utils/utils'
import ColorSelector from '../ColorSelector/ColorSelector'
import StorageSelector from '../StorageSelector/StorageSelector'

import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
  name: string
  basePrice: number
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  selectedColor: ColorOption | null
  selectedStorage: StorageOption | null
  onColorSelect: (color: ColorOption) => void
  onStorageSelect: (storage: StorageOption) => void
  onAddToCart: () => void
}

const ProductInfo = ({
  name,
  basePrice,
  colorOptions,
  storageOptions,
  selectedColor,
  selectedStorage,
  onColorSelect,
  onStorageSelect,
  onAddToCart,
}: ProductInfoProps) => {
  const price = selectedStorage ? selectedStorage.price : basePrice
  const canAddToCart = selectedColor !== null && selectedStorage !== null

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.header}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.price}>
            {selectedStorage ? formatPrice(price) : `From ${formatPrice(basePrice)}`}
          </p>
        </div>
        <StorageSelector
          options={storageOptions}
          selected={selectedStorage}
          onSelect={onStorageSelect}
        />
        <ColorSelector options={colorOptions} selected={selectedColor} onSelect={onColorSelect} />
        <button
          className={`${styles.addButton} ${canAddToCart ? styles.active : ''}`}
          disabled={!canAddToCart}
          onClick={onAddToCart}
          aria-label={
            canAddToCart ? `Add ${name} to cart` : 'Select color and storage to add to cart'
          }
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
