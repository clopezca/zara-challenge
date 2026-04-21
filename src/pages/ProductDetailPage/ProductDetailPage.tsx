import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../features/products/hooks/useProductDetail'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import ProductImage from '../../features/products/components/ProductImage/ProductImage'

import styles from './ProductDetailPage.module.scss'
import ProductInfo from '../../features/products/components/ProductInfo/ProductInfo'
import { useEffect, useState } from 'react'
import type { ColorOption, StorageOption } from '../../types/product.types'
import ProductSpecs from '../../features/products/components/ProductSpecs/ProductSpecs'
import SimilarProducts from '../../features/products/components/SimilarProducts/SimilarProducts'
import BackButton from '../../components/BackButton/BackButton'
import { useCart } from '../../context/cart/useCart'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { product, error } = useProductDetail(id!)
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage || !product) return

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
  }, [id])

  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  const currentImage = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl

  return (
    <>
      <div className={styles.backWrapper}>
        <BackButton />
      </div>
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
    </>
  )
}

export default ProductDetailPage
