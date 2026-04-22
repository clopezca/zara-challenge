import { useState } from 'react'
import type { ColorOption, ProductDetail, StorageOption } from '../../../../types/product.types'
import { formatPrice } from '../../../../utils/utils'
import StorageSelector from '../StorageSelector/StorageSelector'
import ColorSelector from '../ColorSelector/ColorSelector'
import ProductImage from '../ProductImage/ProductImage'
import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
  product: ProductDetail
  onAddToCart: (selectedColor: ColorOption, selectedStorage: StorageOption) => void
}

const ProductInfo = ({ product, onAddToCart }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  const price = selectedStorage ? selectedStorage.price : product.basePrice
  const canAddToCart = selectedColor !== null && selectedStorage !== null
  const currentImage = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl

  return (
    <>
      <section className={styles.hero}>
        <ProductImage imageUrl={currentImage} name={product.name} />
        <div className={styles.info}>
          <div className={styles.header}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>
              {selectedStorage ? formatPrice(price) : `From ${formatPrice(product.basePrice)}`}
            </p>
          </div>
          <StorageSelector
            options={product.storageOptions}
            selected={selectedStorage}
            onSelect={setSelectedStorage}
          />
          <ColorSelector
            options={product.colorOptions}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
          <button
            className={`${styles.addButton} ${canAddToCart ? styles.active : ''}`}
            disabled={!canAddToCart}
            onClick={() => canAddToCart && onAddToCart(selectedColor, selectedStorage)}
            aria-label={
              canAddToCart
                ? `Add ${product.name} to cart`
                : 'Select color and storage to add to cart'
            }
          >
            Add
          </button>
        </div>
      </section>
    </>
  )
}

export default ProductInfo
