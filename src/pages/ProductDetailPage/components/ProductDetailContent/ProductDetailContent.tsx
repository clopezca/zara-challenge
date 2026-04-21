import { useEffect, useState } from 'react'
import { useCart } from '../../../../context/cart/useCart'
import type { ColorOption, ProductDetail, StorageOption } from '../../../../types/product.types'
import ProductImage from '../../../../features/products/components/ProductImage/ProductImage'
import ProductInfo from '../../../../features/products/components/ProductInfo/ProductInfo'
import ProductSpecs from '../../../../features/products/components/ProductSpecs/ProductSpecs'
import SimilarProducts from '../../../../features/products/components/SimilarProducts/SimilarProducts'

import styles from './ProductDetailContent.module.scss'

interface Props {
  product: ProductDetail
}

const ProductDetailContent = ({ product }: Props) => {
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return

    addItem({
      cartItemId: crypto.randomUUID(),
      id: product.id,
      brand: product.brand,
      name: product.name,
      imageUrl: selectedColor.imageUrl,
      selectedColor,
      selectedStorage,
      price: selectedStorage.price,
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product.id])

  const currentImage = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl

  return (
    <main className={`${styles.page} fadeIn`}>
      <section className={styles.hero} aria-label={`${product.name} details`}>
        <ProductImage imageUrl={currentImage} name={product.name} />

        <ProductInfo
          name={product.name}
          basePrice={product.basePrice}
          colorOptions={product.colorOptions}
          storageOptions={product.storageOptions}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          onColorSelect={setSelectedColor}
          onStorageSelect={setSelectedStorage}
          onAddToCart={handleAddToCart}
        />
      </section>

      <ProductSpecs
        brand={product.brand}
        name={product.name}
        description={product.description}
        specs={product.specs}
      />
      <SimilarProducts products={product.similarProducts} />
    </main>
  )
}

export default ProductDetailContent
