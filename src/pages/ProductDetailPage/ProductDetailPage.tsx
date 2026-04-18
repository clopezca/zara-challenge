import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../features/products/hooks/useProductDetail'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

//import styles from './ProductDetailPage.module.scss'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { product, error } = useProductDetail(id!)

  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  return (
    <main>
      <div>{product.name}</div>
    </main>
  )
}

export default ProductDetailPage
