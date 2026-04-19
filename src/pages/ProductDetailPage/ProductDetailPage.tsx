import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../features/products/hooks/useProductDetail'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import ProductImage from '../../features/products/components/ProductImage/ProductImage'

import styles from './ProductDetailPage.module.scss'
import ProductInfo from '../../features/products/components/ProductInfo/ProductInfo'
import { useState } from 'react'
import type { ColorOption, StorageOption } from '../../types/product.types'
import ProductSpecs from '../../features/products/components/ProductSpecs/ProductsSpecs'
import SimilarProducts from '../../features/products/components/SimilarProducts/SimilarProducts'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { product, error } = useProductDetail(id!)
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  const currentImage = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
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
          onAddToCart={() => console.log('add to cart')}
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

export default ProductDetailPage
