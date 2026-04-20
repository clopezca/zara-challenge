import styles from './ProductImage.module.scss'

interface ProductImageProps {
  imageUrl: string
  name: string
}

const ProductImage = ({ imageUrl, name }: ProductImageProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={imageUrl} alt={name} />
    </div>
  )
}

export default ProductImage
