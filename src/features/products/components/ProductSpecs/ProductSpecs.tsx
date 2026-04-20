import type { ProductSpecs as ProductSpecsType } from '../../../../types/product.types'

import styles from './ProductSpecs.module.scss'

interface ProductSpecsProps {
  brand: string
  name: string
  description: string
  specs: ProductSpecsType
}

const ProductSpecs = ({ brand, name, description, specs }: ProductSpecsProps) => {
  const rows = [
    { label: 'brand', value: brand },
    { label: 'name', value: name },
    { label: 'description', value: description },
    { label: 'screen', value: specs.screen },
    { label: 'resolution', value: specs.resolution },
    { label: 'processor', value: specs.processor },
    { label: 'main camera', value: specs.mainCamera },
    { label: 'selfie camera', value: specs.selfieCamera },
    { label: 'battery', value: specs.battery },
    { label: 'os', value: specs.os },
    { label: 'screen refresh rate', value: specs.screenRefreshRate },
  ]

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>specifications</h2>
      <dl className={styles.list}>
        {rows.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dt className={styles.value}>{value}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default ProductSpecs
