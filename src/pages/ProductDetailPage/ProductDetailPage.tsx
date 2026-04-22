import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../features/products/hooks/useProductDetail'
import { useCart } from '../../context/cart/useCart'
import type { ColorOption, StorageOption } from '../../types/product.types'
import ProductInfo from '../../features/products/components/ProductInfo/ProductInfo'
import ProductSpecs from '../../features/products/components/ProductSpecs/ProductSpecs'
import SimilarProducts from '../../features/products/components/SimilarProducts/SimilarProducts'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import BackButton from '../../components/BackButton/BackButton'
import styles from './ProductDetailPage.module.scss'
import { useEffect } from 'react'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { product, error } = useProductDetail(id!)
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const handleAddToCart = (selectedColor: ColorOption, selectedStorage: StorageOption) => {
    if (!product) return
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

  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  return (
    <>
      <div className={styles.backWrapper}>
        <BackButton />
      </div>
      <main className={`${styles.page} fadeIn`}>
        <ProductInfo key={product.id} product={product} onAddToCart={handleAddToCart} />
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
