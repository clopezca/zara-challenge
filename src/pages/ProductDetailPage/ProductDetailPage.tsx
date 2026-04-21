import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../features/products/hooks/useProductDetail'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import BackButton from '../../components/BackButton/BackButton'
import ProductDetailContent from './components/ProductDetailContent/ProductDetailContent'

import styles from './ProductDetailPage.module.scss'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { product, error } = useProductDetail(id!)

  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  return (
    <>
      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      <ProductDetailContent key={product.id} product={product} />
    </>
  )
}

export default ProductDetailPage
