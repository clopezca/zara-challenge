import styles from './ProductImage.module.scss'

interface ProductImageProps {
  imageUrl: string
  name: string
}

const ProductImage = ({ imageUrl, name }: ProductImageProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={imageUrl} alt={name} width={510} height={630} />
    </div>
  )
}

export default ProductImage
